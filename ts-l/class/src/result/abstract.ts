/**
 * 抽象类
 * 使用 abstract 约束类
 * 抽象类不允许实力话，只是用来继承和约束类的方法
 * 抽象方法需要子类去必须去实现 abstract
 */

(function () {
  abstract class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    abstract sayHi(): void;
  }

  class Dog extends Animal {
    constructor({ name, age }: { name: string; age: number }) {
      super(name, age);
    }
    run() {
      console.log("跑起来了");
    }
    sayHi(): void {
      console.log("汪汪汪");
    }
  }

  const dog = new Dog({
    name: "小黑狗子",
    age: 12,
  });

  dog.run();
  dog.sayHi();
})();
