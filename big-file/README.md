### 前端文件切片上传

#### 切片函数

```
const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;


```

#### 文件哈希生成

```
SparkMD5

```
#### 实现原理

1. 文件切片 单个上传
2. 文件唯一标识（内容加文件名的hash）
3. 控制发起网络请求的个数，避免过多导致浏览网络阻塞

#### 具体实现

```
$ npm run dev

# 浏览器访问页面

 file.js文件里面具体实现

```

#### 效果

上传图片观察 `file/uploads `下会有文件切片，`file/files `下会有切片合成的整体文件
