let a: number = 123;

const add = async () => {
  const result = await new Promise<number>((resolve, reject) => {
    resolve(1);
  });
  return a + result;
};

add().then((result) => {
  console.log(result);
});
