module.exports = function (content, map, meta) {
  console.log("sync");
  /**
   *  第一个参数： err 是否有错误
   *  第二个参数： content 处理后的内筒
   *  第三个参数： source-map 继续传递source-map
   *  第四个参数： meta 给下一个loader 传递参数
   */
  this.callback(null, content, map, meta);
};
