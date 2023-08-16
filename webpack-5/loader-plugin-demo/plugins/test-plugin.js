/**
 1. webpack 加载完webpack.config.js中所有的配置。此时就会调用new TestPlugin() 
 2. webpack 创建compiler对象
 3. 遍历plugins中的所有插件，调用插件的apply方法
 4. 执行剩下的编程流程 （触发各个hooks事件）
 * 
 */

class TestPlugin {
  constructor() {
    console.log("constructor");
  }
  apply(compiler) {
    debugger;
    console.log("compiler: ", compiler);
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("environment");
      /* ... */
    });

    // emit  是异步串行  所以会按顺序执行
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      debugger;
      console.log("compilation: ", compilation);
      console.log("emit tap  1");
    });
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, cb) => {
      setTimeout(() => {
        console.log("emit  tapAsync 2");
        cb();
      }, 2000);
    });
    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("emit  tapPromise 3");
          resolve();
        }, 2000);
      });
    });

    // 异步并行勾子  同时执行
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, cb) => {
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("seal");
      });
      setTimeout(() => {
        console.log("make  tapAsync 1");
        cb();
      }, 3000);
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, cb) => {
      setTimeout(() => {
        console.log("make  tapAsync 2");
        cb();
      }, 1000);
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, cb) => {
      setTimeout(() => {
        console.log("make  tapAsync 3");
        cb();
      }, 2000);
    });
  }
}

module.exports = TestPlugin;
