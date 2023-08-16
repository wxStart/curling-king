const path = require("path");
const EslitWebpackPlugin = require("eslint-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css提取单独文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css压缩

const TerserPlugin = require("terser-webpack-plugin"); // js 压缩
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 图片压缩

const CopyPlugin = require("copy-webpack-plugin");

const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
// const ElementPlus = require("unplugin-element-plus/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const isProd = process.env.NODE_ENV === "production";

const getStyleLoaders = (pre) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "vue-style-loader",
    "css-loader",
    {
      // 配合package.json中的browsersList 指定兼容
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre && {
      loader: pre,
      options:
        pre === "sass-loader"
          ? {
              additionalData: `@use "@styles/element/index.scss" as *;`,
            }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProd ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProd
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProd
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: isProd
      ? "static/assets/[hash:10][ext][query]"
      : "static/assets/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },

      {
        test: /\.(jpe?g|png|gif|webp|svg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|ttf)/,
        type: "asset/resource",
      },
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // 开启缓存  第二次打包更快
          cacheDirectory: path.resolve(
            __dirname,
            "../node_modules/.cache/vue-loader"
          ),
        },
      },
    ],
  },
  plugins: [
    new EslitWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    isProd &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    isProd &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    AutoImport({
      // element-plus 按需引入
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ].filter(Boolean),
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "cheap-module-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      //  打包拆离分组
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
          name: "chunk-vue",
          priority: 40,
        },
        antd: {
          test: /[\\/]node_modules[\\/]element-plus(.*)?[\\/]/,
          name: "chunk-element-plus",
          priority: 30,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
    minimize: isProd,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",

                    // enable built-in plugins by name
                    "prefixIds",

                    // or by expanded notation which allows to configure plugin
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
        },
      }),
    ],
  },
  resolve: {
    extensions: [".vue", ".js", "json"],
    alias: {
      "@styles": path.resolve(__dirname, "../src/styles"),
    },
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  performance: false, //关闭性能分析
};
