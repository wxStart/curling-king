/**
 * 构造函数：在类创建时候就会自动被调用
 * this 就是当前创建的对象
 *
 */
(function () {
  class Dog {
    name: string;
    age: number;
    constructor({ name, age }: { name: string; age: number }) {
      console.log("实例正在被创建");
      console.log("this: ", this);
      this.name = name;
      this.age = age;
    }
  }

  const dog1 = new Dog({
    name: "小黑子",
    age: 12,
  });

  const dog2 = new Dog({
    name: "小白",
    age: 11,
  });
})();
