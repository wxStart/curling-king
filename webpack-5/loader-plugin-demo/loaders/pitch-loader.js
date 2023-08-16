module.exports = function (content) {
  return content;
};
module.exports.pitch = function () {
  console.log("pitch");
  // 一旦这里有 return  后续的pitch都不执行了 以及正常的loader也不执行了
  //  pitch1 --> pitch2 --> pitch3--> normal3 --> normal2 -->normal1
  //  假如  pitch2 返回则执行顺序  pitch1 --> pitch2 --> normal1  结束，其他的都不执行了 熔断机制
};


// pitch  重上往下，从左到右  刚好了loader执行顺序相反
