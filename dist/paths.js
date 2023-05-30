"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths = {
    root: __dirname,
    execRoot: process.cwd(),
    outputDir: 'src',
};
// ;['src', 'app', 'source'].forEach((dir) => {
//   if (fs.existsSync(path.join(paths.execRoot, dir))) paths.outputDir = dir
// })
exports.default = paths;
