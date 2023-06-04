"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const generator_utils_1 = require("./generator.utils");
const paths_1 = __importDefault(require("../paths"));
const writeFileTo_1 = require("../utils/writeFileTo");
const argparser_1 = require("../argparser");
class Generator {
    get template() {
        return this._template;
    }
    get relativePath() {
        return this._relativePath;
    }
    constructor(params) {
        if (typeof params === 'string') {
            this._relativePath = params;
            this.pathTo = [];
        }
        else {
            this._relativePath = params.relativePath;
            this.input = params.input;
            this.variables = params.variables;
            this.pathTo = params.pathTo || [];
        }
        const template = this._getTemplate();
        this._template = template;
        this.fileName = this.input ? (0, generator_utils_1.replacePattern)(template.fileName, this.input) : template.fileName;
        this.content = template.content;
    }
    _getTemplate() {
        try {
            const splitted = this._relativePath.split(/\\|\//g);
            const doc = js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.join(paths_1.default.root, 'templates', ...splitted), { encoding: 'utf8' }));
            return doc;
        }
        catch (err) {
            throw new Error(`Failed parse template on path ${this._relativePath}. Error: ` + err);
        }
    }
    writeContent() {
        return this._wrap(() => {
            (0, writeFileTo_1.writeFileTo)(path_1.default.join(paths_1.default.execRoot, paths_1.default.outputDir, ...this.pathTo, this.fileName), this.content);
        });
    }
    replaceContent(passCond = false) {
        return this._wrap(() => {
            if (!passCond)
                this.content = (0, generator_utils_1.replaceConditonalPattern)(this.content, argparser_1.args.flags);
            this.content = (0, generator_utils_1.replacePattern)(this.content, this.input || '', this.variables);
        });
    }
    _wrap(callback) {
        callback();
        return this;
    }
}
Generator.config = generator_utils_1.generatorConfig;
exports.Generator = Generator;
