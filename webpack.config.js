const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./index.js",
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve("./catch_loader.js"),
            options: {
              /* ... */
            },
          },
        ],
      },
    ],
  },
};
