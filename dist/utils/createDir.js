"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createDir = (dirName) => {
    if (!fs_1.default.existsSync(path_1.default.join(dirName))) {
        fs_1.default.mkdirSync(path_1.default.join(dirName));
    }
};
exports.createDir = createDir;
