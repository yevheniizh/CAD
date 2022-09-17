const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",

  entry: {
    app: path.join(__dirname, './src/index.ts'),
    styles: path.join(__dirname, './src/assets/styles/index.css')
  },
  output: {
    path: isProduction
      ? path.join(__dirname, "build")
      : path.join(__dirname, "dist"),
    filename: `[name].bundle.js`,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use:      ['babel-loader', 'source-map-loader'],
      },
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use:      ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    // SET 'process.env.NODE_ENV' CONSTANT THROUGH ALL APP
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
    }),

    // CLEAN 'DIST' FOLDER IN DEVELOPMENT MODE
    isProduction
      ? new CleanWebpackPlugin()
      : new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")],
        }),
  ],
};

module.exports = config;