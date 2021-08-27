const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};
