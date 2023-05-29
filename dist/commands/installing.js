"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMongoDeps = exports.installDeps = exports.getInstalledPackages = void 0;
const child_process_1 = require("child_process");
const devPackages = [
    'typescript',
    '@types/express',
    '@types/node',
    '@types/cors',
    'nodemon',
    'ts-node',
];
const packages = ['dotenv', 'express', 'cors', 'nanoid'];
const mongoPackages = ['mongodb'];
const getInstalledPackages = () => {
    var _a;
    const result = (0, child_process_1.execSync)('npm ls --json').toString();
    const arr = result ? Object.keys((_a = JSON.parse(result)) === null || _a === void 0 ? void 0 : _a.dependencies) : [];
    return arr;
};
exports.getInstalledPackages = getInstalledPackages;
const installDeps = (dev = false) => {
    (0, child_process_1.execSync)(`npm i ${dev ? '--save-dev ' + devPackages.join(' ') : packages.join(' ')}`, 
    // @ts-ignore: Unreachable code error
    (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
};
exports.installDeps = installDeps;
const installMongoDeps = (module) => {
    // @ts-ignore: Unreachable code error
    (0, child_process_1.execSync)(`npm i ${mongoPackages.join(' ')}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
};
exports.installMongoDeps = installMongoDeps;
