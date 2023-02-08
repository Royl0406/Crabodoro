const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    onBoarding: './src/Settings/onBoarding.ts'
  }, 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'onBoarding.html',
      template: 'src/Settings/onBoarding.html',
      chunks: ["onBoarding"]
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
      ],
    }),
  ]
};
