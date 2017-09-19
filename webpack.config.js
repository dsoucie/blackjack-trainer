var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /\.(png|jpg)$/, use: 'file-loader' },
      { test: /\.(svg)$/, use: 'file-loader' },
    ]
  },
plugins: [new HtmlWebpackPlugin({
  template: 'app/index.html'
})]
};