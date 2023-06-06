"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfig = exports.generateErrorHandlerModule = exports.generate3rdPartyModule = exports.generateMongoModule = exports.generate = void 0;
const argparser_1 = __importDefault(require("../argparser/argparser"));
const generateSecretKey_1 = require("../utils/generateSecretKey");
const generator_constructor_1 = require("./generator.constructor");
const generateItem = (type, name) => {
    const entity = new generator_constructor_1.Generator({
        input: name,
        pathTo: [`${type}s`],
        relativePath: `${type}s/_${type}.yaml`,
    })
        .replaceContent()
        .writeContent();
    console.log(`${entity.fileName} was generated`);
};
const generate = () => {
    const { gen } = argparser_1.default;
    Object.keys(gen).forEach((name) => {
        if (gen[name].includes('m'))
            generateItem('model', name);
        if (gen[name].includes('c'))
            generateItem('controller', name);
        if (gen[name].includes('s'))
            generateItem('service', name);
        if (gen[name].includes('mw'))
            generateItem('middleware', name);
    });
};
exports.generate = generate;
const generateMongoModule = () => {
    new generator_constructor_1.Generator({
        relativePath: 'services/MongoService/index.yaml',
        pathTo: ['services', 'MongoService'],
    }).writeContent();
    new generator_constructor_1.Generator({
        relativePath: 'services/MongoService/interface.yaml',
        pathTo: ['services', 'MongoService'],
    }).writeContent();
    new generator_constructor_1.Generator({
        relativePath: 'services/MongoService/serviceWithMongo.yaml',
        pathTo: ['services', 'MongoService'],
    }).writeContent();
};
exports.generateMongoModule = generateMongoModule;
const generate3rdPartyModule = () => {
    new generator_constructor_1.Generator({
        relativePath: 'services/ThirdPartyRequestService.yaml',
        pathTo: ['services'],
    }).writeContent();
};
exports.generate3rdPartyModule = generate3rdPartyModule;
const generateErrorHandlerModule = () => {
    new generator_constructor_1.Generator({
        relativePath: 'utils/errorHandler/dictionary.yaml',
        pathTo: ['utils', 'errorHandler'],
    }).writeContent();
    new generator_constructor_1.Generator({
        relativePath: 'utils/errorHandler/index.yaml',
        pathTo: ['utils', 'errorHandler'],
    }).writeContent();
    new generator_constructor_1.Generator({
        relativePath: 'controllers/utils.yaml',
        pathTo: ['controllers'],
    }).writeContent();
};
exports.generateErrorHandlerModule = generateErrorHandlerModule;
const generateConfig = () => {
    const pathTo = ['config'];
    new generator_constructor_1.Generator({ relativePath: 'config/index.yaml', pathTo }).replaceContent().writeContent();
    const access = (0, generateSecretKey_1.generateSecretKey)();
    const refresh = (0, generateSecretKey_1.generateSecretKey)();
    new generator_constructor_1.Generator({ relativePath: 'config/auth.yaml', pathTo, variables: { access, refresh } })
        .replaceContent()
        .writeContent();
};
exports.generateConfig = generateConfig;
