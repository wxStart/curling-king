// 泛型的作用  定义的时候不知道类型，只有在执行的时候才知道类型
// 泛型 在类中的使用

type IPersion = new (name: string) => Persion; // 等价 IPersion2

interface IPersion2 {
  new (name: string): Persion;
}

function createInstance(classOne: IPersion, name: string) {
  return new classOne(name);
}

class Persion {
  eat() {}
  constructor(public name: string) {}
}

createInstance(Persion, "lisi");

// 泛型用法

interface IPersion3<T> {
  new (name: string): T;
}

function createInstance3<T>(classOne: IPersion3<T>, name: string): T {
  return new classOne(name);
}

// 在createInstance3 传入一个泛型T   IPersion3 中就接收到 T
createInstance3<Persion>(Persion, "lisi");
class Dog {
  constructor(public name: string) {}
  say() {}
}
createInstance3(Dog, "阿黄");

function createArray<T>(time: number, val: T): Array<T> {
  let result: T[] = [];
  for (let index = 0; index < time; index++) {
    result.push(val);
  }
  return result;
}

createArray(4, 123);
createArray(4, true);
createArray<string>(4, "ABC");

const swap = <T, K>(tuple: [T, K]): [K, T] => {
  return [tuple[1], tuple[0]];
};

swap(["1", 12]);

swap(["1", false]);

const createArray2: <T>(time: number, val: T) => Array<T> = <T>(
  time: number,
  val: T
): Array<T> => {
  let result: T[] = [];
  for (let index = 0; index < time; index++) {
    result.push(val);
  }
  return result;
};

createArray2(4, 123);

type ICreateArray = <T>(time: number, val: T) => Array<T>; // 等效 InICreateArray

const createArray3: ICreateArray = <T>(time: number, val: T): Array<T> => {
  let result: T[] = [];
  for (let index = 0; index < time; index++) {
    result.push(val);
  }
  return result;
};
createArray3(4, 123);

interface InICreateArray {
  <T>(time: number, val: T): Array<T>;
}

//  IPersion3 和 InICreateArray 的传参有点不一样，
//  放在函数前  表示使用函数时候确认了类型
//  放在接口后面，表示使用接口确定类型
//  InICreateArray 和  IPersion3 使用是不一样的

const createArray4: InICreateArray = <T>(time: number, val: T): Array<T> => {
  let result: T[] = [];
  for (let index = 0; index < time; index++) {
    result.push(val);
  }
  return result;
};

createArray4(4, "ss");

// 约束 T 属于string
const sum = <T extends string>(a: T, b: T): T => {
  return (a + b) as T;
};

//  泛型约束 主要清掉类型中必须包含某个属性
type withLength = {
  length: number;
};
const sumLength = <T extends withLength, K extends withLength>(
  a: T,
  b: K
): number => {
  return a.length + b.length;
};
sumLength([1, 2], { length: 12 });
sumLength("12", { length: 12 });
// sumLength(12, { length: 12 });

// 限制 K是T的 key
const getVal = <T extends object, K extends keyof T>(object: T, key: K) => {};
getVal({ a: 12, b: "12" }, "b");
// getVal({ a: 12, b: "12" }, "c");//  报错

type T1 = keyof { a: 12, b: "12" } // 'a' || 'b'
type T2 = keyof string // 拿的事String对向的key

type T3 = keyof any // string | number | symbol

export {};
