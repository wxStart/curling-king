module.exports = function (content, map, meta) {
  const callback = this.async();
  //   callback 开始执行的时候就说明 异步执行完了 ，你自己控制callback的执行时机
  setTimeout(() => {
    console.log("async");
    callback(null, content, map, meta);
  }, 1000);
};
