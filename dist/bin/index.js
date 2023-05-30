#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argparser_1 = __importDefault(require("../argparser/argparser"));
const generator_1 = require("../generator");
const initializer_1 = require("../initializer");
const paths_1 = __importDefault(require("../paths"));
const makeDirs_1 = require("../utils/makeDirs");
if (argparser_1.default.init) {
    (0, initializer_1.installDeps)(true);
    (0, initializer_1.installDeps)();
    (0, generator_1.writeSimpleTemplate)('tsconfig.yaml', paths_1.default.outputDir);
    (0, generator_1.writeSimpleTemplate)('nodemon.yaml', paths_1.default.outputDir);
    (0, generator_1.writeSimpleTemplate)('config.yaml', paths_1.default.outputDir);
    (0, generator_1.writeSimpleTemplate)('router.yaml', paths_1.default.outputDir);
    (0, generator_1.writeSimpleTemplate)('index.yaml', paths_1.default.outputDir);
    (0, generator_1.writeSimpleTemplate)('controllers/interface.yaml', paths_1.default.outputDir + '/controllers');
    (0, initializer_1.addScripts)();
}
if (argparser_1.default.test) {
    console.log('some test command');
}
if (argparser_1.default.mdir.length) {
    (0, makeDirs_1.makeDirs)(argparser_1.default.mdir);
}
if (Object.keys(argparser_1.default.gen).length) {
    (0, generator_1.generate)();
}
if (argparser_1.default.modules.includes('mongo')) {
    (0, initializer_1.installMongoDeps)();
    (0, generator_1.generateMongoModule)();
    console.log('Mongo module was generated');
}
if (argparser_1.default.modules.includes('3rdparty')) {
    (0, generator_1.generate3rdPartyModule)();
    console.log('3rd party request module was generated');
}
if (argparser_1.default.checkPkg) {
    const packages = (0, initializer_1.getInstalledPackages)();
    console.log('INSTALLED PACKAGES: ', packages);
}
process.exit();
