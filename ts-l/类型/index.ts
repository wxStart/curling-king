// 变量声明
// 变量名:变量类型
let a: string; // a的类型只能是字符串了
a = "12";
let b: string = "aqwe";

// 字面量   值不允许改变了
let s: "sss";
s = "sss";

let sex: "a" | "b";
sex = "a";
sex = "b";

// unknown 安全类型的any 不能直接进行赋值给声明类型的变量
let d: unknown;
d = "s";
// a= d;
a = d as string;
a = <string>d;
if (typeof d == "string") {
  a = d;
}

// 函数
// 函数名(参数名:参数类型[,...]) : 返回值类型
function add(n: number, n1: number): number {
  return n + n1;
}

let result = add(1, 2);

function fn2(): void {}

function fn3(): never {
  throw Error("出错了");
}

// object
// 一般约定对象里面包含哪些属性

let o1: object;
o1 = { name: "wx" };

let o2: { name: string; age?: number };
o2 = { name: "12" };
o2 = { name: "wx", age: 32 };
// o2 = { name: "wx", age: 32, sex: "nan" };

// 必须有name属性，其他属性随意
let o3: { name: "wx"; [propName: string]: any };

let fnt: (a: number, b: number) => number;
fnt = function (s: number, c: number) {
  return s;
};

// array
let a1: string[] | number[];
a1 = ["s", "sd"];
a1 = [1, 2];

let a2: Array<number | string>;
a2 = [1, 2, 3, "s"];

// 元组 固定长度的数组
let t1: [string, number];
t1 = ["s", 12];

// 枚举

enum Gender {
  Male = 0,
  Female = 1,
}
let e1: { name: string; gender: Gender };

e1 = {
  name: "WX",
  gender: Gender.Male,
};

// 定义了j的结构必须有name和age属性
let j: { name: string } & { age: number };
j = { name: "wx", age: 32 };
