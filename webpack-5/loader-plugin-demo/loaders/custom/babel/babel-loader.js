const schema = require("./schema.json");
module.exports = function (content) {

  const authorOptions = this.getOptions(schema);
  const perfix = `
        /**
         * Author:${authorOptions.author}  
         * 
        */
    `;
  return perfix + content;
};
