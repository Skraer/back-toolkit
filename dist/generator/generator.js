"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorHandlerModule = exports.generate3rdPartyModule = exports.generateMongoModule = exports.generate = exports.writeSimpleTemplate = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const generator_utils_1 = require("./generator.utils");
const paths_1 = __importDefault(require("../paths"));
const writeFileTo_1 = require("../utils/writeFileTo");
const argparser_1 = __importDefault(require("../argparser/argparser"));
const getTemplate = (relativePath) => {
    try {
        const splitted = relativePath.split(/\\|\//g);
        const doc = js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.join(paths_1.default.root, 'templates', ...splitted), { encoding: 'utf8' }));
        return doc;
    }
    catch (err) {
        throw new Error(`Failed parse template on path ${relativePath}. Error: ` + err);
    }
};
const writeSimpleTemplate = (relativePath, pathTo) => {
    const template = getTemplate(relativePath);
    (0, writeFileTo_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, pathTo, template.fileName), template.content);
};
exports.writeSimpleTemplate = writeSimpleTemplate;
const generator = (type, name) => {
    const template = getTemplate(`${type}s/_${type}.yaml`);
    let content = (0, generator_utils_1.replaceConditonalPattern)(template.content, argparser_1.default.flags);
    content = (0, generator_utils_1.replacePattern)(content, name);
    (0, writeFileTo_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, paths_1.default.outputDir, `${type}s`, (0, generator_utils_1.replacePattern)(template.fileName, name)), content);
    console.log(`${(0, generator_utils_1.toPascalCase)(type)} ${name} was generated`);
};
const generateModel = generator.bind(null, 'model');
const generateController = generator.bind(null, 'controller');
const generateService = generator.bind(null, 'service');
const generateMiddleware = generator.bind(null, 'middleware');
const generate = () => {
    const { gen } = argparser_1.default;
    Object.keys(gen).forEach((name) => {
        if (gen[name].includes('m'))
            generateModel(name);
        if (gen[name].includes('c'))
            generateController(name);
        if (gen[name].includes('s'))
            generateService(name);
        if (gen[name].includes('mw'))
            generateMiddleware(name);
    });
};
exports.generate = generate;
const generateMongoModule = () => {
    (0, exports.writeSimpleTemplate)('services/MongoService/index.yaml', paths_1.default.outputDir + '/services/MongoService');
    (0, exports.writeSimpleTemplate)('services/MongoService/interface.yaml', paths_1.default.outputDir + '/services/MongoService');
    (0, exports.writeSimpleTemplate)('services/MongoService/serviceWithMongo.yaml', paths_1.default.outputDir + '/services/MongoService');
};
exports.generateMongoModule = generateMongoModule;
const generate3rdPartyModule = () => {
    (0, exports.writeSimpleTemplate)('services/ThirdPartyRequestService.yaml', paths_1.default.outputDir + '/services');
};
exports.generate3rdPartyModule = generate3rdPartyModule;
const generateErrorHandlerModule = () => {
    (0, exports.writeSimpleTemplate)('utils/errorHandler/dictionary.yaml', paths_1.default.outputDir + '/utils/errorHandler');
    (0, exports.writeSimpleTemplate)('utils/errorHandler/index.yaml', paths_1.default.outputDir + '/utils/errorHandler');
    (0, exports.writeSimpleTemplate)('controllers/utils.yaml', paths_1.default.outputDir + '/controllers');
};
exports.generateErrorHandlerModule = generateErrorHandlerModule;
