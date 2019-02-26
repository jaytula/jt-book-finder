const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].js',
  },
  plugins: [
    DEBUG ? null : new MiniCssExtractPlugin({filename: '[name].css'}),
    DEBUG ? new webpack.HotModuleReplacementPlugin() : null,
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
