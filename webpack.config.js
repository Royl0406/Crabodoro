const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");


module.exports = {
  entry: {
    background: "./src/background.ts",
    onBoarding: "./src/Settings/onBoarding.ts",
    main: "./src/Game-menus/main.js",
    crabSpace: "./src/Crab-Space/crabSpace.ts",
    pomodoro: "./src/Popup/pomodoro.js",
    "warning-tab": "./src/Screen-Blocker/warning-tab.js",
    "warning-tab-rmv": "./src/Screen-Blocker/warning-tab-rmv.ts",
    settings: "./src/Settings/settings.ts",
    shop: "./src/Shop/shop.ts",
    stats: "./src/Stats-Screen/stats.ts",
    break: "./src/Break-menu/break.ts"
  }, 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        use: "html-loader"
      },
      {
        test: /\.(png|jpg)$/i,
        type: "asset/resource",
        generator: {
            filename: "images/[name]-[hash][ext]"
        }
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "onBoarding.html",
      template: "src/Settings/onBoarding.html",
      chunks: ["onBoarding"]
    }),
    new HtmlWebpackPlugin({
      filename: "main.html",
      template: "src/Game-menus/main.html",
      chunks: ["main"]
    }),
    new HtmlWebpackPlugin({
      filename: "crabSpace.html",
      template: "src/Crab-Space/crabSpace.html",
      chunks: ["crabSpace"]
    }),
    new HtmlWebpackPlugin({
      filename: "pomodoro.html",
      template: "src/Popup/pomodoro.html",
      chunks: ["pomodoro"]
    }),
    new HtmlWebpackPlugin({
      filename: "warning-tab.html",
      template: "src/Screen-Blocker/warning-tab.html",
      chunks: ["warning-tab"]
    }),
    new HtmlWebpackPlugin({
      filename: "settings.html",
      template: "src/Settings/settings.html",
      chunks: ["settings"]
    }),
    new HtmlWebpackPlugin({
      filename: "shop.html",
      template: "src/Shop/shop.html",
      chunks: ["shop"]
    }),
    new HtmlWebpackPlugin({
      filename: "stats.html",
      template: "src/Stats-Screen/stats.html",
      chunks: ["stats"]
    }),
    new HtmlWebpackPlugin({
      filename: "break.html",
      template: "src/Break-menu/break.html",
      chunks: ["break"]
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
      ],
    })
  ]
};
