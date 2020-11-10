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

  if (typeof options.catchCode === "function") {
    options.catchCode = options.catchCode(options.identifier);
  }
  let catchNode = parser.parse(options.catchCode).program.body;

  traverse(ast, {
    AwaitExpression(path) {
      if (path.findParent((path) => t.isTryStatement(path.node))) return;

      if (t.isVariableDeclarator(path.parent)) {
        // 变量声明
        let variableDeclarationPath = path.parentPath.parentPath;
        let tryCatchAst = t.tryStatement(
          t.blockStatement([
            variableDeclarationPath.node, // Ast
          ]),
          t
            .catchClause
            //...
            ()
        );
        variableDeclarationPath.replaceWithMultiple([tryCatchAst]);
      } else if (t.isAssignmentExpression(path.parent)) {
        // 赋值表达式
        let expressionStatementPath = path.parentPath.parentPath;
        let tryCatchAst = t.tryStatement(
          t.blockStatement([expressionStatementPath.node]),
          t
            .catchClause
            //...
            ()
        );
        expressionStatementPath.replaceWithMultiple([tryCatchAst]);
      } else {
        // await 表达式
        let tryCatchAst = t.tryStatement(
          t.blockStatement([t.expressionStatement(path.node)]),
          t.catchClause(
            t.identifier(options.identifier),
            t.blockStatement(catchNode)
          )
        );
        console.log(
          "%celelee test:",
          "background:#000;color:#fff"
          // t.identifier(options.identifier)
        );
        path.replaceWithMultiple([tryCatchAst]);
      }
    },
  });

  // return source;
  return core.transformFromAstSync(ast, undefined, {
    configFile: false, // 屏蔽 babel.config.js，否则会注入 polyfill 使得调试变得困难
  }).code;
};
