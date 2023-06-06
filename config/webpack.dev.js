const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 采用commonjs写法
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 出口
  output: {
    path: undefined,
    // 主文件输出名
    filename: "static/js/main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 只检测以.css结尾的文件
        use: [
          "style-loader", // 将js中的css动态生成style标签添加到html中生效
          "css-loader", // 将css资源编译成commonjs的模块到js中
        ], // 执行顺序，从下到上，从右到左
      },
      {
        // use 可以使用多个，loader只能使用一个
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          // 将 Stylus 文件编译为 CSS
          "stylus-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, // 小于50kb的图片转base64, 有点是减少请求数量，缺点是会变大
          },
        },
        generator: {
          // hash .左边的值; hash:10表示哈希值取钱10位，ext扩展名，例如jpg, 查询参数
          filename: "static/images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi)$/,
        type: "asset",
        // type: "asset/resourse", // 待修正
        generator: {
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 排除的文件
        use: {
          loader: "babel-loader",
          // 智能预设可以在这些 也可以在外面 babel.config.js 写
          // options: {
          //   presets: ["@babel/preset-env"],
          // },
        },
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // 检查哪些文件
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 模版 以 public/index.html为模版创建新资源
      // 特点， 1.结构与原来一致 2.自动引入打包输出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器，实时更新
  devServer: {
    host: "localhost",
    port: "3031",
    open: true,
  },
  // 模式
  mode: "development",
};
