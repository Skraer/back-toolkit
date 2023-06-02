"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.args = void 0;
const argsparser_constructor_1 = require("./argsparser.constructor");
exports.args = new argsparser_constructor_1.ArgsParser(process.argv.slice(2))
    .parseMdirs()
    .parseGen()
    .parseModules()
    .parseInit()
    .parseTest()
    .parseCheckPkg()
    .parseVars()
    .parseFlags();
exports.default = exports.args;
