const schema = require("./schema.json");

module.exports = function (content) {
  console.log("content: ", content);

  // schema  要符合 JSON Schema的规则
  const authorOptions = this.getOptions(schema);
  console.log("authorOptions: ", authorOptions);
  const perfix = `
        /**
         * Author:${authorOptions.author}  
         * 
        */
    `;
  return perfix + content;
};
