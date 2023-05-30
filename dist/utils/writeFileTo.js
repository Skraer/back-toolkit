"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileTo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const makeDir_1 = require("./makeDir");
const writeFileTo = (pathTo, content) => {
    (0, makeDir_1.makeDir)(path_1.default.join(...pathTo.split(/[\/\\]/g).slice(0, -1)));
    fs_1.default.writeFileSync(path_1.default.join(pathTo), Buffer.from(content.trim()));
    return pathTo;
};
exports.writeFileTo = writeFileTo;
