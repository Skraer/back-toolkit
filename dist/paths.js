"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argparser_1 = __importDefault(require("./argparser/argparser"));
const paths = {
    root: __dirname,
    execRoot: process.cwd(),
    outputDir: argparser_1.default.appDir || 'src',
};
// ;['src', 'app', 'source'].forEach((dir) => {
//   if (fs.existsSync(path.join(paths.execRoot, dir))) paths.outputDir = dir
// })
exports.default = paths;
