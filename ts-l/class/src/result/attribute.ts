/**
 * 属性封装
 *
 * public 修饰的属性可以在任意位置访问和修改 默认就是
 * private 私有属性，私有属性只能在这个类的内部访问
 * protected 保护属性 只能在当前类的子类的内部访问
 * 
 * get 访问器属性
 * set 设置属性
 *
 */

(function () {
  class Attrbnute {
    private _name: string;
    protected age: number;

    constructor(name: string, age: number) {
      this._name = name;
      this.age = age;
    }

    get name() {
      return this._name;
    }
    set name(val: any) {
      if (typeof val == "string") {
        this._name = val;
      } else {
        console.log("name的值必须是个字符串v");
      }
    }

    getName(): string {
      return this._name;
    }
    setName(val: any): void {
      if (typeof val == "string") {
        this._name = val;
      } else {
        console.log("name的值必须是个字符串v");
      }
    }
  }

  const a = new Attrbnute("小白杨", 18);

  console.log("a", a);
  console.log("getName", a.getName());
  a.setName(12);
  console.log("getName", a.getName());

  console.log("get name", a.name);
  a.name = 12;

})();
