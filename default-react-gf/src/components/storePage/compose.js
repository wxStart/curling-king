const compose = function (...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};

function f1(args) {
  console.log("f1", args);
  return args;
}

function f2(args) {
  console.log("f2", args);
  return args;
}

function f3(args) {
  console.log("f3", args);
  return args;
}

const f4 = compose(f1, f2, f3);

console.log("f4: ", f4);

export default compose;

