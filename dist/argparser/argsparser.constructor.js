"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsParser = void 0;
const _1 = require("./");
class ArgsParser {
    get gen() {
        return this._gen;
    }
    get mdir() {
        return this._mdir;
    }
    get modules() {
        return this._modules;
    }
    get checkPkg() {
        return this._checkPkg;
    }
    get init() {
        return this._init;
    }
    get test() {
        return this._test;
    }
    get vars() {
        return this._vars;
    }
    get flags() {
        return this._flags;
    }
    constructor(rawArgs) {
        this._gen = {};
        this._mdir = [];
        this._modules = [];
        this._checkPkg = false;
        this._init = false;
        this._test = false;
        this._vars = {
            appDir: undefined,
        };
        this._flags = {
            mongo: false,
            errh: false,
            auth: false,
        };
        this._rawSource = rawArgs;
        this._raw = rawArgs;
    }
    parseMdirs() {
        return this._wrap((raw) => {
            if (raw.includes('mdir')) {
                raw = raw.reduce((currArgs, arg, idx, arr) => {
                    const prevArg = arr[idx - 1];
                    const nextArg = arr[idx + 1];
                    if (arg === 'mdir')
                        this._mdir.push(nextArg);
                    if (prevArg && prevArg === 'mdir')
                        return currArgs.slice(idx - 1, idx + 1);
                    return [...currArgs, arg];
                }, []);
            }
            return raw;
        });
    }
    parseGen() {
        return this._wrap((raw) => {
            if (raw.find((arg) => arg.startsWith('gen:'))) {
                raw = raw.reduce((currArgs, arg, idx, arr) => {
                    const prevArg = arr[idx - 1];
                    const nextArg = arr[idx + 1];
                    if (arg.startsWith('gen:')) {
                        const elems = arg.replace('gen:', '').split(':');
                        this._gen[nextArg] = [...new Set(elems.filter((el) => (0, _1.isGenValid)(el)))];
                    }
                    if (prevArg && prevArg.startsWith('gen:')) {
                        return [...currArgs.slice(0, idx - 1), ...currArgs.slice(idx + 1)];
                    }
                    return [...currArgs, arg];
                }, []);
            }
            return raw;
        });
    }
    parseModules() {
        return this._wrap((raw) => {
            if (raw.find((arg) => arg.startsWith('modules:'))) {
                const modulesSet = new Set([]);
                raw = raw.reduce((currArgs, arg, idx) => {
                    if (arg.startsWith('modules:')) {
                        const elems = arg.replace('modules:', '').split(':');
                        elems.filter((el) => (0, _1.isModuleValid)(el)).forEach((m) => modulesSet.add(m));
                        return [...currArgs.slice(0, idx), ...currArgs.slice(idx + 1)];
                    }
                    return [...currArgs, arg];
                }, []);
                this._modules = [...modulesSet];
            }
            return raw;
        });
    }
    parseInit() {
        return this._wrap((raw) => {
            if (raw.includes('init')) {
                this._init = true;
                raw = raw.filter((arg) => arg !== 'init');
            }
            return raw;
        });
    }
    parseTest() {
        return this._wrap((raw) => {
            if (raw.includes('test')) {
                this._test = true;
                raw = raw.filter((arg) => arg !== 'test');
            }
            return raw;
        });
    }
    parseCheckPkg() {
        return this._wrap((raw) => {
            if (raw.includes('checkpkg') || raw.includes('check-pkg')) {
                this._checkPkg = true;
                raw = raw.filter((arg) => arg !== 'checkpkg' && arg !== 'check-pkg');
            }
            return raw;
        });
    }
    parseVars() {
        return this._wrap((raw) => {
            const varNames = Object.keys(this._vars);
            varNames.forEach((varName) => {
                const lower = varName.toLowerCase();
                const foundArg = raw.find((arg) => arg.startsWith(`${lower}=`));
                if (foundArg) {
                    const value = foundArg.split('=')[1];
                    this._vars[varName] = value || undefined;
                    raw = raw.filter((arg) => !arg.startsWith(`${lower}=`));
                }
            });
            return raw;
        });
    }
    parseFlags() {
        return this._wrap((raw) => {
            const flags = Object.keys(this._flags);
            flags.forEach((flag) => {
                if (raw.includes(`-${flag}`)) {
                    this._flags[flag] = true;
                    raw = raw.filter((arg) => arg !== `-${flag}`);
                }
            });
            return raw;
        });
    }
    _wrap(callback) {
        let raw = this._raw;
        this._raw = callback(raw);
        return this;
    }
}
exports.ArgsParser = ArgsParser;
