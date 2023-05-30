"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDirs = void 0;
const makeDir_1 = require("./makeDir");
const makeDirs = (dirs) => {
    dirs.forEach((dir) => {
        (0, makeDir_1.makeDir)(dir);
    });
};
exports.makeDirs = makeDirs;
