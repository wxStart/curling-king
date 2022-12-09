window.onload = function () {
  const btn = document.getElementById("btn");
  let input = document.getElementById("file");
  btn.addEventListener("click", function () {
    input.click();
  });

  // 使用Blob.slice方法来对文件进行分割。
  // 同时该方法在不同的浏览器使用方式不同。
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;
  const hashFile = (file, chunkSize) => {
    return new Promise((resolve, reject) => {
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      function loadNext() {
        const start = currentChunk * chunkSize;
        const end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      fileReader.onload = (e) => {
        spark.append(e.target.result); // Append array buffer
        currentChunk += 1;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          console.log("finished loading");
          const result = spark.end();
          // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
          // 想保留两个文件无法保留。所以把文件名称加上。
          const sparkMd5 = new SparkMD5();
          sparkMd5.append(result);
          sparkMd5.append(file.name);
          const hexHash = sparkMd5.end();
          resolve(hexHash);
        }
      };
      fileReader.onerror = () => {
        console.warn("文件读取失败！");
      };
      loadNext();
    }).catch((err) => {
      console.log(err);
    });
  };

  const sliceFile = ({ file, fileHash, chunkSize } = {}) => {
    if (!file || !fileHash) {
      return;
    }
    const lists = [];
    const blockCount = Math.ceil(file.size / chunkSize); // 分片总数
    for (let i = 0; i < blockCount; i++) {
      const start = i * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      const item = {
        chunk: blobSlice.call(file, start, end),
        chunkhash: `${i}`,
        index: i,
        hash: fileHash,
        total: blockCount,
        size: file.size,
        name: file.name,
      };

      lists.push(item);
    }
    return lists;
  };

  const mergeFile = (data) => {
    axios
      .post("/api/file/merge_chunks", data)
      .then((res) => {
        alert("上传成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFileChunks = async ({
    lists,
    fileHash,
    file,
    tryNumber,
    functionNumber,
  } = {}) => {
    if (lists.length === 0) {
      const data = {
        size: file.size,
        name: file.name,
        hash: fileHash,
      };
      mergeFile(data);
      return;
    }
    let number = functionNumber || 0;
    if (number >= tryNumber) {
      return alert("失败重连次数超过限制了");
    }
    number++;

    let pool = []; //并发池
    let max = 3; //最大并发量
    let finish = 0; //完成的数量
    let failList = []; //失败的列表
    for (let i = 0, len = lists.length; i < len; i++) {
      const element = lists[i];
      // 构建表单
      const form = new FormData();
      form.append("file", element.chunk);
      form.append("name", element.name);
      form.append("total", element.blockCount);
      form.append("index", element.i);
      form.append("size", element.size);
      form.append("hash", element.hash);
      form.append("chunkhash", element.chunkhash);

      const axiosOptions = {
        onUploadProgress: (e) => {
          // 处理上传的进度
          // console.log(e, file, element.hash, element.chunkhash, element.index);
        },
      };
      const task = axios.post("/api/file/upload", form, axiosOptions);

      task
        .then((data) => {
          if (data && data.data && data.data.ok) {
            //请求结束后将该Promise任务从并发池中移除
            let index = pool.findIndex((t) => t === task);
            pool.splice(index);
          } else {
            throw err(`${element.i} 上传失败了`);
          }
        })
        .catch(() => {
          failList.push(element);
        })
        .finally(() => {
          finish++;
          //所有请求都请求完成
          if (finish === len) {
            // 失败重传
            uploadFileChunks({
              lists: failList,
              fileHash,
              file,
              tryNumber,
              functionNumber: number,
            });
          }
        });
      pool.push(task);
      if (pool.length === max) {
        // 个数达到临界值 阻塞一下
        await Promise.race(pool);
      }
    }
  };

  let submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", async () => {
    const files = input.files;
    const file = files[0];
    const chunkSize = 2 * 10 * 1000; // 每个chunk的大小，设置为20k
    if (!file) {
      alert("没有获取文件");
      return;
    }
    const fileHash = await hashFile(file, chunkSize); //文件 hash
    const lists = sliceFile({ file, fileHash, chunkSize });

    uploadFileChunks({
      lists,
      fileHash,
      file,
      tryNumber: 5,
    });
  });
};
