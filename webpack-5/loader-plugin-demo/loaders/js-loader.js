// map  SourceMap
// mate 别的loader传递的参数
module.exports = function (content, map, meta) {
  console.log("meta: ", meta);
  console.log("map: ", map);
  console.log("content: ", content);
  return content;
};
