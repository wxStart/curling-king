import { dataJson } from "./unit/const";
import "./assets/css/index.css";

const count = 2;
console.log("count: ", count);
const ab = () => {
  const a = [...[1, 2, 4]];
  console.log("a:1 ", a);
  const obj = {
    foo: {
      bar: {
        baz() {
          return 4212;
        },
      },
    },
  };

  const baz = obj?.foo?.bar?.baz(); // 42
  console.log("baz:123 ", baz, dataJson);
};
ab();

if (module.hot) {
  module.hot.accept("./unit/const", function () {
    console.log("Accepting the updated printMe module!");
  });
}

// var a = 12;
