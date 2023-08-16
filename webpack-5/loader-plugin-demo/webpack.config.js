const path = require("path");
const HtmllPlugin = require("html-webpack-plugin");
const BannerWebpackPlugin = require("./plugins/custom/banner");
const CleanWebpackPlugin = require("./plugins/custom/clean");
const AnalyzeWebpackPlugin = require("./plugins/custom/analyze");
const InlineChunkWebpackPlugin = require("./plugins/custom/inlineChunk");

const config = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "./loaders/js-loader.js",
      //     },
      //   ],
      // },
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: "./loaders/custom/babel/babel-loader.js",
          //   options: {
          //     presets: ["@babel/preset-env"],
          //   },
          // },
          // {
          //   loader: "./loaders/custom/banner/banner-loader.js",
          //   options: {
          //     author: "wx",
          //   },
          // },
          // {
          //   loader: "./loaders/custom/clean-log/clean-log-loader.js",
          // },
          // {
          //   loader: "./loaders/sync-loader.js",
          // },
          // {
          //   loader: "./loaders/async-loader.js",
          // },
          // {
          //   loader: "./loaders/raw-loader.js",
          // },
          // {
          //   loader: "./loaders/pitch-loader.js",
          // },
        ],
      },
    ],
  },
  plugins: [
    new HtmllPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new BannerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
    new InlineChunkWebpackPlugin([/runtime(.*).js$/g]),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
  },
  mode: "production",
  devServer: {
    static: "./dist",
    hot: true,
  },
};

module.exports = config;
