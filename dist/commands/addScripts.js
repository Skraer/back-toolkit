"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScripts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
            dev: 'nodemon --config nodemon.json ./src/index.ts -test-db',
        },
    };
    const buffer = Buffer.from(JSON.stringify(resultData, undefined, 2));
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '/package.json'), buffer);
};
exports.addScripts = addScripts;
