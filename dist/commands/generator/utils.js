"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.expandSwitchBlocks = exports.expandBlocksWithArg = exports.replaceAllTemplates = exports.getTplText = exports.writeFileTo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dirMethods_1 = require("../utils/dirMethods");
const paths_1 = __importDefault(require("../../paths"));
const config_1 = __importDefault(require("./config"));
const rawArgs = process.argv.slice(2);
const replaceTemplate = (template, input) => {
    const splitted = template.split(config_1.default.separator);
    const filter = splitted[1] ? splitted[1][0] : null;
    switch (filter) {
        case config_1.default.lowerCase:
            return input.toLowerCase();
        case config_1.default.upperCase:
            return input.toUpperCase();
        case config_1.default.firstUpper:
            return input[0].toUpperCase() + input.substr(1);
        case config_1.default.firstLower:
            return input[0].toLowerCase() + input.substr(1);
        default:
            return input;
    }
};
const writeFileTo = (pathTo, textData) => {
    (0, dirMethods_1.makeDir)(path_1.default.join(...pathTo.split(/[\/\\]/g).slice(0, -1)));
    fs_1.default.writeFileSync(path_1.default.join(pathTo), Buffer.from(textData.trim()));
    return pathTo;
};
exports.writeFileTo = writeFileTo;
const getTplText = (fileName) => fs_1.default.readFileSync(path_1.default.join(paths_1.default.root, 'src', '_templates', fileName)).toString();
exports.getTplText = getTplText;
const replaceAllTemplates = (textData, input) => textData.replace(config_1.default.pattern, (str) => replaceTemplate(str, input));
exports.replaceAllTemplates = replaceAllTemplates;
const expandBlocksWithArg = (textData) => {
    return textData.replace(config_1.default.patternBlock, (str, argsT, content) => rawArgs.some((arg) => argsT.includes(arg)) ? content : '');
};
exports.expandBlocksWithArg = expandBlocksWithArg;
const expandSwitchBlocks = (textData) => {
    const cliArgs = rawArgs.map((arg) => arg.replace(/\!/g, ''));
    return textData.replace(config_1.default.patternSwitch, (str, matched) => {
        return matched
            .replace(config_1.default.patternSwitchItem, (str, argsT, content) => {
            let passed = true;
            const templateArgs = argsT.split(',').map((el) => el.trim());
            templateArgs.forEach((argT) => {
                if (argT.startsWith('!')) {
                    if (cliArgs.includes(argT.slice(1))) {
                        passed = false;
                    }
                }
                else if (!cliArgs.includes(argT)) {
                    passed = false;
                }
            });
            return passed ? content.trim() : '';
        })
            .trim();
    });
};
exports.expandSwitchBlocks = expandSwitchBlocks;
// const expandBlocksWithArg = (textData) => {
//   const cliArgs = rawArgs.map((arg) => arg.replace(/\!/g, ''))
//   return textData.replace(config.patternBlock, (str, argsT, content) => {
//     let pass = true
//     const templateArgs = argsT.split(',').map((el) => el.trim())
//     templateArgs.forEach((argT) => {
//       if (argT.startsWith('!')) {
//         if (cliArgs.includes(argT.slice(1))) {
//           pass = false
//         }
//       } else if (!cliArgs.includes(argT)) {
//         pass = false
//       }
//     })
//     return pass ? content : ''
//   })
// }
const getFileName = (name, postfix) => {
    if (postfix === undefined) {
        throw new Error('Postfix was not passed');
    }
    if (typeof postfix !== 'string') {
        throw new Error('Postfix must be a string');
    }
    if (name.length <= 1) {
        throw new Error('Name must have at least 2 chars');
    }
    const result = name[0].toUpperCase() + name.slice(1) + postfix;
    return result;
};
exports.getFileName = getFileName;
