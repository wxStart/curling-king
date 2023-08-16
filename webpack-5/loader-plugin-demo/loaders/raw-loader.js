module.exports = function (content, map, meta) {
  console.log("content: ", content);
  return content;
};
// raw loader  的重要部分，接受到的数据是 <Buffer   不论是同步还是异步
//  一般图片 字体图标  视频等文件的
module.exports.raw = true;
