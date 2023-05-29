"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDir = exports.copyFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dirMethods_1 = require("./dirMethods");
const copyFile = (fromPath, toPath) => {
    toPath = toPath || fromPath;
    const src = path_1.default.join(__dirname, '../../', fromPath);
    const output = path_1.default.join(process.cwd(), '/', toPath);
    const pathArr = toPath.split(/[\/\\]/g);
    if (pathArr.length > 1) {
        const dir = pathArr.slice(0, pathArr.length - 1).join('/');
        (0, dirMethods_1.makeDir)(dir);
    }
    const rawData = fs_1.default.readFileSync(path_1.default.join(src));
    fs_1.default.writeFileSync(output, rawData);
};
exports.copyFile = copyFile;
const copyDir = (fromPath, toPath) => {
    toPath = toPath || fromPath;
    if ((!fromPath.endsWith('/') && !fromPath.endsWith('\\')) ||
        (!toPath.endsWith('/') && !toPath.endsWith('\\'))) {
        throw new Error('Path must be end with / or \\');
    }
    const src = path_1.default.join(__dirname, '../../', fromPath);
    const output = path_1.default.join(process.cwd(), '/', toPath);
    const pathArr = toPath.split(/[\/\\]/g);
    if (pathArr.length > 1) {
        const dir = pathArr.slice(0, pathArr.length - 1).join('/');
        (0, dirMethods_1.makeDir)(dir);
    }
    const files = fs_1.default.readdirSync(path_1.default.join(src));
    files.forEach((fileName) => {
        const rawData = fs_1.default.readFileSync(path_1.default.join(src, fileName));
        fs_1.default.writeFileSync(path_1.default.join(output, fileName), rawData);
    });
};
exports.copyDir = copyDir;
