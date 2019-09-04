const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devtool: "source-map",
  entry: "./test/app.js",
  devServer: {
    contentBase: path.join(__dirname, "test"),
    compress: true,
    port: 9200
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: './test/index.html'
    })
  ]
});
