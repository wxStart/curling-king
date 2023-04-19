class Person {
  name: string = "杨幂";
  age: number = 22;

  // 只读属性
  readonly redname: string = "杨幂";

  // 只能通过类去访问，实例访问不了
  static status: number = 12;

  sayHi(): void {
    console.log("hi");
  }
}

const per: Person = new Person();
console.log("Person: ", Person.status);
console.log("per: ", per);

class C1 {
  name: string;
  age: number;
  constructor({ name, age }: { name: string; age: number }) {
    this.name = name;
    this.age = age;
  }
}
class C {
  constructor(public name: string, public age: number) {}
  /**
   * 就是一下的语法糖
       * 
       * name: string;
       * age: number;
       *  constructor(name: string;   age: number) {
            this.name = name;
            this.age = age;
         }
       * 
       */
}

const c1 = new C1({
  name: "wx",
  age: 11,
});
console.log("c1: ", c1);

const c = new C("wx", 11);
console.log("语法糖 c : ", c);
