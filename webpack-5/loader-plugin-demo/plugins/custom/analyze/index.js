const pluginName = "AnalyzeWebpackPlugin";

class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      // 1. 遍历所有即将输出文件，得到其大小

      const assets = Object.entries(compilation.assets);

      // 2. 生成一个md文件

      let content = `| 资源名称 | 文件大小 |
| --- | --- |`;
      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${Math.ceil(file.size() / 1024)}KB |`;
      });
      compilation.assets["analyze.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
