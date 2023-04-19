### 安装依赖

`npm i -D typescript ts-loader`

### 配置 ts 文件处理

```
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader'
            }
        ]
    }

```

### babel转换
`npm i -D @bable/core  @babel/preset-env  core-js babel-loader` 
```
    module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: 73,
                      ie: 9,
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: [/node_modules/],
      },
    ],
  },

```
