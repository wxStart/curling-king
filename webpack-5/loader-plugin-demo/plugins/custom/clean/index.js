const pluginName = "clean-webpack-plugin";

class CleanWebpackPlugin {
  apply(compiler) {
    // 1. 在打包输出之前 emit
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      // 2. 获取打包输出目录
      const outputPath = compiler.outputPath; // complier.options.output.path也是输出路径
      console.log("outputPath: ", outputPath);

      const fs = compiler.outputFileSystem;
      // 3. 删除输出的目录下的所有文件

      this.removeFiles(fs, outputPath);
    });
  }
  removeFiles(fs, filePath) {
    const files = fs.readdirSync(filePath);
    console.log("files: ", files);
    files.forEach((file) => {
      const path = filePath + "/" + file;
      const stat = fs.statSync(path);
      if (stat.isDirectory()) {
        this.removeFiles(fs, path);
      } else {
        fs.unlinkSync(path);
      }
    });
    const handlefiles = fs.readdirSync(filePath);
    if (handlefiles.length == 0) {
      fs.rmdirSync(filePath);
    }
  }
}

module.exports = CleanWebpackPlugin;
