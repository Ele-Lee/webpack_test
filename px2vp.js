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

  traverse(ast, {
    TaggedTemplateExpression(path) {
      const tag = path.node.tag;
      if (tag.object.name !== "styled") return;
      const quasis = path.node.quasi.quasis.map((item) => {
        const newRaw = item.value.raw.replace("red", "yellow");
        return t.templateElement({ raw: newRaw });
      });

      const quasi = t.templateLiteral(quasis, path.node.quasi.expressions);

      path.replaceWith(t.taggedTemplateExpression(tag, quasi));
      path.skip();
    },
  });

  // return source;
  return core.transformFromAstSync(ast, undefined, {
    configFile: false, // 屏蔽 babel.config.js，否则会注入 polyfill 使得调试变得困难
  }).code;
};
