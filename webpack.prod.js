const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
});
