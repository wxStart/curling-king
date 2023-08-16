module.exports = {
  extends: ["react-app"], // 继承react的规则

  parserOptions: {
    babelOptions: {
      presets: [
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
  },
};
