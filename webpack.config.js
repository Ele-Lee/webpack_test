const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./index.js",
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: path.resolve("./catch_loader.js"),
      //       options: {
      //         /* ... */
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "@linaria/webpack4-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: path.resolve("./px2vp.js"),
            options: {
              /* ... */
            },
          },
        ],
      },
    ],
  },
};
