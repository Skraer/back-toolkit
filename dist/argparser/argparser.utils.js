"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModuleValid = exports.isGenValid = void 0;
const isGenValid = (elem) => ['s', 'c', 'm', 'mw'].includes(elem);
exports.isGenValid = isGenValid;
const isModuleValid = (elem) => ['3rdparty', 'mongo', 'errh', 'auth'].includes(elem);
exports.isModuleValid = isModuleValid;
