#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const installing_1 = require("../commands/installing");
const dirMethods_1 = require("../commands/utils/dirMethods");
const copyFile_1 = require("../commands/utils/copyFile");
const addScripts_1 = require("../commands/addScripts");
const config_1 = __importDefault(require("../commands/generator/config"));
const generator_1 = __importDefault(require("../commands/generator"));
// const getArgAfter = (str) => rawArgs[rawArgs.findIndex((arg) => arg === str)]
const rawArgs = process.argv.slice(2);
if (rawArgs.includes('init')) {
    (0, installing_1.installDeps)(true);
    (0, installing_1.installDeps)();
    (0, copyFile_1.copyFile)('/src/root/tsconfig.json', '/tsconfig.json');
    (0, copyFile_1.copyFile)('/src/root/nodemon.json', '/nodemon.json');
    (0, copyFile_1.copyFile)('/src/config.ts');
    (0, copyFile_1.copyFile)('/src/router.ts');
    (0, copyFile_1.copyFile)('/src/index.ts');
    (0, copyFile_1.copyFile)('/src/controllers/interface.ts');
    (0, addScripts_1.addScripts)();
}
else if (rawArgs.includes('test')) {
    console.log(config_1.default);
}
else if (rawArgs.includes('mdir')) {
    const dirName = rawArgs[rawArgs.findIndex((el) => el === 'mdir') + 1];
    (0, dirMethods_1.makeDir)(dirName);
}
else if (rawArgs.find((arg) => arg.startsWith('gen'))) {
    (0, generator_1.default)();
}
else if (rawArgs.includes('check-pkg')) {
    const packages = (0, installing_1.getInstalledPackages)();
    console.log('PACKAGES', packages);
}
else if (rawArgs.includes('utils')) {
    (0, copyFile_1.copyDir)('/src/utils/');
}
process.exit();
