/**
 * 接口
 * 使用interface 对类进行限制,限制类必须符合接口
 */

(function () {
  interface myInterFace {
    name: string;
    sayHi(): void;
  }
  class My implements myInterFace {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    sayHi(): void {
      console.log("大家好哦😯");
    }
  }
})();
