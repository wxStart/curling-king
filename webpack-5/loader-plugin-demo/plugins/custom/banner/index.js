class BannerWebpackPlugin {
  constructor(options) {}
  apply(compiler) {
    // 资源输出之前触发
    compiler.hooks.emit.tapAsync(
      "BannerWebpackPlugin",
      (compilation, callback) => {
        // 1. 获取即将输出的资源文件  ： compilation.assets;
        // 2. 过滤只保留js和css资源
        const extensions = ["css", "js"];
        const assets = Object.keys(compilation.assets).filter((assetsPath) => {
          const split = assetsPath.split(".");
          const extension = split[split.length - 1];
          return extensions.includes(extension);
        });

        const perfix = `
      /**
       *  Author: wx
       */`;
        // 3. 遍历剩余资源添加注释
        assets.forEach((asset) => {
          // 获取原来的内容
          const source = compilation.assets[asset].source();
          const content = perfix + source;
          compilation.assets[asset] = {
            // 最总资源输出时候，调用source方法    返回值就是资源的具体内容
            source() {
              return content;
            },
            // 资源的大小
            size() {
              return content.length;
            },
          };
        });

        callback();
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
