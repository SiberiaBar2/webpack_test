const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStrleloader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader", // 将css资源编译成commonjs的模块到js中
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数兼容问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}
// 采用commonjs写法
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 出口
  output: {
    // __dirname node.js的变量，代表当前文件夹的文件夹目录
    path: path.resolve(__dirname, "../dist"), // 文件输出路径
    // 主文件输出名
    filename: "static/js/main.js",
    // 自动清空上一次打包的内容，不用再手动删除了
    // 原理：打包时 将整个path目录清空，再进行打包
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 只检测以.css结尾的文件
        use: getStrleloader(), // 执行顺序，从下到上，从右到左
      },
      {
        // use 可以使用多个，loader只能使用一个
        test: /\.less$/,
        use: getStrleloader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStrleloader("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStrleloader("stylus-loader"),
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
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    new CssMinimizerPlugin()
  ],
  // 模式
  mode: "production",
};
