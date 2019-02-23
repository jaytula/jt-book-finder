const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js', 'webpack-hot-middleware/client'],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'  ),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};