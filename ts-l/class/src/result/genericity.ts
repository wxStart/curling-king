/**
 * 泛型 T
 * 遇到不明确类型的时候使用
 */

// 泛型

(() => {
  function fn<T>(a: T): T {
    console.log(a);
    return a;
  }
  fn(10);
  fn("ss");
  fn<string>("12");

  interface T1 {
    length: number;
  }

  // 约定泛型必须是T1的一个子类
  function fn2<T extends T1>(a: T) {}

  // 多个泛型
  function fn3<T, X, Y>(a: T, b: X, c: Y): void {
    console.log(a, b, c);
  }
  fn3(12, 12, 12);

  //   类中使用泛型
  class Tc<T> {
    name: T;
    constructor(name: T) {
      this.name = name;
    }
  }

  const tc = new Tc(1);
  console.log("tc: ", tc);
  const tc1 = new Tc("String");
  console.log("tc1: ", tc1);
})();
