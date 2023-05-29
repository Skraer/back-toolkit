"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const rawArgs = process.argv.slice(2);
const getArgAfter_1 = require("../../utils/getArgAfter");
const utils_1 = require("./utils");
const paths_1 = __importDefault(require("../../paths"));
const installing_1 = require("../installing");
const copyFile_1 = require("../utils/copyFile");
const handleTextData = (tplName, name) => {
    let textData = (0, utils_1.getTplText)(tplName);
    textData = (0, utils_1.expandSwitchBlocks)(textData);
    textData = (0, utils_1.expandBlocksWithArg)(textData);
    textData = (0, utils_1.replaceAllTemplates)(textData, name);
    return textData;
};
const generateController = (name) => {
    const textData = handleTextData('controller.ts', name);
    const distPath = (0, utils_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, 'src', 'controllers', (0, utils_1.getFileName)(name, 'Controller.ts')), textData);
    console.log(`Controller ${name} was created in: ${distPath}`);
};
const generateModel = (name) => {
    const textData = handleTextData('model.ts', name);
    const distPath = (0, utils_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, 'src', 'models', (0, utils_1.getFileName)(name, '.ts')), textData);
    console.log(`Model ${name} was created in: ${distPath}`);
};
const generateService = (name) => {
    const textData = handleTextData('service.ts', name);
    const distPath = (0, utils_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, 'src', 'services', (0, utils_1.getFileName)(name, 'Service.ts')), textData);
    console.log(`Service ${name} was created in: ${distPath}`);
};
const generateMiddleware = (name) => {
    const textData = handleTextData('middleware.ts', name);
    const distPath = (0, utils_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, 'src', 'middlewares', (0, utils_1.getFileName)(name, 'Middleware.ts')), textData);
    console.log(`Moddleware ${name} was created in: ${distPath}`);
};
const generateModuleMongo = () => {
    const servicePath = '/src/services/MongoService';
    (0, installing_1.installMongoDeps)();
    (0, copyFile_1.copyFile)(servicePath + '/interface.ts');
    (0, copyFile_1.copyFile)(servicePath + '/index.ts');
    (0, copyFile_1.copyFile)('/src/models/MongoDoc.ts');
    console.log(`Mongo module was created in: ${servicePath}`);
};
const generate3rdParty = () => {
    const modulePath = '/src/services/ThirdPartyRequestService.ts';
    (0, copyFile_1.copyFile)(modulePath);
    console.log(`3rd party module was created in: ${modulePath}`);
};
const generate = () => {
    const fullArg = rawArgs.find((arg) => arg.startsWith('gen'));
    if (fullArg) {
        const args = fullArg.split(':');
        const name = (0, getArgAfter_1.getArgAfter)(fullArg);
        if (args.includes('module')) {
            if (args.includes('mongo')) {
                generateModuleMongo();
            }
            if (args.includes('3rdparty')) {
                generate3rdParty();
            }
        }
        else {
            if (args.includes('c')) {
                generateController(name);
            }
            if (args.includes('m')) {
                generateModel(name);
            }
            if (args.includes('s')) {
                generateService(name);
            }
            if (args.includes('mw')) {
                generateMiddleware(name);
            }
        }
    }
};
exports.default = generate;
