const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");

const DEFAULT = {
  catchCode: (identifier) => `console.error(${identifier})`,
  identifier: "e",
  finallyCode: null,
};

module.exports = function (source) {
  let options = loaderUtils.getOptions(this);
  options = {
    ...DEFAULT,
    ...options,
  };
  let ast = parser.parse(source, {
    sourceType: "module", // 支持 es6 module
    plugins: ["dynamicImport"], // 支持动态 import
  });

  // if (typeof options.catchCode === "function") {
  //   options.catchCode = options.catchCode(options.identifier);
  // }
  // let catchNode = parser.parse(options.catchCode).program.body;

  console.log("%celelee test:", "background:#000;color:#fff", 1);
  traverse(ast, {
    AwaitExpression(path) {
      console.log("%celelee test:", "background:#000;color:#fff", path);
    },
  });

  // return source;
  return source;
};
