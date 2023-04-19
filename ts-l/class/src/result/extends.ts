/**
 * 继承
 * 使用extends 和 super
 * 使用继承，子类就会拥有父类的所有属性和方法
 * super 就是访问的父类
 */

(function () {
  class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    sayHi(): void {
      console.log(`${this.name}:在叫！！！`);
    }
  }

  class Dog extends Animal {
    constructor({ name, age }: { name: string; age: number }) {
      super(name, age);
    }
    run() {
      console.log("跑起来了");
    }
    sayHi(): void {
      super.sayHi();
      console.log("汪汪汪");
    }
  }

  const dog = new Dog({
    name: "小黑狗子",
    age: 12,
  });

  dog.run();
  dog.sayHi();

  class Cat extends Animal {
    constructor({ name, age }: { name: string; age: number }) {
      super(name, age);
    }
  }

  const cat = new Cat({
    name: "小猫咪",
    age: 11,
  });

  cat.sayHi();
})();
