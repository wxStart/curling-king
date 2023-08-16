const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");
const pluginName = "InlineChunkWebpackPlugin";

class InlineChunkWebpackPlugin {
  constructor(tests) {
    this.tests = tests;
  }
  apply(compiler) {
    const hooks = compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 1.获取html-webpack-plugin 的hooks
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      // 2. 注册hooks  alterAssetTagGroups
      hooks.alterAssetTagGroups.tap(pluginName, (assets) => {
        assets.headTags = this.getInlineChunk(
          assets.headTags,
          compilation.assets
        );
        assets.bodyTags = this.getInlineChunk(
          assets.bodyTags,
          compilation.assets
        );
      });
      // 删除
      hooks.afterEmit.tap(pluginName, () => {
        Object.keys(compilation.assets).forEach((filePath) => {
          const test = this.tests.some((test) => test.test(filePath));
          if (test) delete compilation.assets[filePath];

          //   if (/runtime(.*).js$/g.test(filePath))
          //     delete compilation.assets[filePath];
        });
      });
    });
  }
  getInlineChunk(tags, assets) {
    return tags.map((tag) => {
      if (tag.tagName !== "script") return tag;
      const filePath = tag.attributes.src;
      if (!filePath) return tag;
      const test = this.tests.some((test) => test.test(filePath));
      //   if (!/runtime(.*).js$/g.test(filePath)) return tag;
      if (!test) return tag;

      return {
        tagName: "script",
        innerHTML: assets[filePath].source(),
        closeTag: true,
      };
    });
  }
}

module.exports = InlineChunkWebpackPlugin;
