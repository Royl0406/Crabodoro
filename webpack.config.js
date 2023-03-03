const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");


const config = {
  devtool: "inline-source-map",
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
        { from: "Assets/128.png", to: "128.png" }
      ],
    })
  ]
}


module.exports = (env, argv) => {
  const makeSentryPlugin = (dryRun) => {
    return new SentryWebpackPlugin({
      dryRun,
      org: "roy-liu",
      project: "crabodoro",

      // Specify the directory containing build artifacts
      include: "./dist",

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and needs the `project:releases` and `org:read` scopes
      authToken: "c66bcffb1b5749aa829282b526fd9e2bfa1621b1379249caa0b5732656d0f432",

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
    })
  }

  const definePlugin = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(argv.mode || "development")
  });
  config.plugins.unshift(definePlugin);

  if (argv.mode === "production") {
    config.devtool = "source-map";
    config.plugins.push(makeSentryPlugin(false));
  }
  else {
    config.plugins.push(makeSentryPlugin(true));
  }
  return config;
};
