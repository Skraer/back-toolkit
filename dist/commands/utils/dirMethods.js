"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDir = exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createDir = (dirName) => {
    if (!fs_1.default.existsSync(path_1.default.join(dirName))) {
        fs_1.default.mkdirSync(path_1.default.join(dirName));
    }
};
exports.createDir = createDir;
const makeDir = (dirPath) => {
    const dirs = dirPath.split(/[\/\\]/g);
    if (dirs.length === 1) {
        (0, exports.createDir)(dirs[0]);
    }
    else if (dirs.length > 1) {
        for (let idx = 0; idx < dirs.length; idx++) {
            (0, exports.createDir)(path_1.default.join(...dirs.slice(0, idx + 1)));
        }
    }
    else {
        console.error('Directory was not set');
    }
};
exports.makeDir = makeDir;
