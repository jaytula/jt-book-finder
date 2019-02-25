const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = 'development';
const DEBUG = mode !== 'production';

module.exports = {
  mode: 'development',
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.js',
      'webpack-hot-middleware/client',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css'}),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          DEBUG ? null : {loader: MiniCssExtractPlugin.loader},
          DEBUG ? 'style-loader' : null,
          'css-loader',
        ].filter(e => e),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
