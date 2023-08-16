const os = require("os");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmllPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length;
const config = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: "thread-loader",
                options: {
                  workers: threads,
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, //开启babel 缓存
                  cacheCompression: false, // 关闭文件压缩
                },
              },
            ],

            exclude: /node_modules/,
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "src"), // 检测src的下面的文件,
      exclude: ["node_modules"],
      cache: true,
      threads,
    }),
    new HtmllPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new TerserWebpackPlugin({
      parallel: threads,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: threads,
      }),
    ],
    // usedExports: true,
  },
  mode: "production",
  devServer: {
    static: "./dist",
    hot: true,
  },
};

module.exports = config;
