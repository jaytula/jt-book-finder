const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV;
const DEBUG = mode !== 'production';

console.log(`Webpack mode: ${mode}`);

module.exports = {
  mode,
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.js',
      DEBUG ? 'webpack-hot-middleware/client' : null,
    ].filter(e => e),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: DEBUG ? '[name].js' : '[name].[hash].js',
    //publicPath: '/dist',
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {root: path.resolve(__dirname)}),
    DEBUG ? null : new MiniCssExtractPlugin({filename: '[name].[hash].css'}),
    DEBUG ? new webpack.HotModuleReplacementPlugin() : null,
    DEBUG
      ? null
      : new HtmlWebpackPlugin({template: 'views/index.production.html'}),
  ].filter(e => e),
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
