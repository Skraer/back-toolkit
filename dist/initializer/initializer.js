"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScripts = exports.installMongoDeps = exports.getInstalledPackages = exports.installDeps = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const initializer_utils_1 = require("./initializer.utils");
const paths_1 = __importDefault(require("../paths"));
const installDeps = (isDev = false) => {
    try {
        (0, child_process_1.execSync)(`npm i ${isDev ? '--save-dev ' + initializer_utils_1.devPackages.join(' ') : initializer_utils_1.packages.join(' ')}`);
        console.log('Success installing ' + isDev ? 'dev ' : '' + 'dependencies');
    }
    catch (err) {
        console.error(`exec error: ${err}`);
    }
};
exports.installDeps = installDeps;
const getInstalledPackages = () => {
    var _a;
    try {
        const result = (0, child_process_1.execSync)('npm ls --json').toString();
        const arr = result ? Object.keys((_a = JSON.parse(result)) === null || _a === void 0 ? void 0 : _a.dependencies) : [];
        return arr;
    }
    catch (err) {
        console.error(`exec error: ${err}`);
    }
};
exports.getInstalledPackages = getInstalledPackages;
const installMongoDeps = () => {
    try {
        (0, child_process_1.execSync)(`npm i ${initializer_utils_1.mongoPackages.join(' ')}`);
        console.log('Success installing mongo dependencies');
    }
    catch (err) {
        console.error(`exec error: ${err}`);
    }
};
exports.installMongoDeps = installMongoDeps;
const addScripts = () => {
    const rawData = fs_1.default.readFileSync(path_1.default.join(process.cwd(), '/package.json')).toString();
    const jsonData = JSON.parse(rawData);
    const resultData = {
        ...jsonData,
        scripts: {
            ...jsonData['scripts'],
            build: 'tsc',
            launch: 'node ./dist/index.js',
            'start:test': 'tsc && node ./dist/index.js -test-db',
            start: 'tsc && node ./dist/index.js -prod-db',
            dev: `nodemon --config nodemon.json ./${paths_1.default.outputDir}/index.ts -test-db`,
        },
    };
    const buffer = Buffer.from(JSON.stringify(resultData, undefined, 2));
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '/package.json'), buffer);
};
exports.addScripts = addScripts;
