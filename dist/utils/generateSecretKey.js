"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecretKey = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateSecretKey = () => {
    const key = Math.random().toString(36).slice(2);
    const saltRounds = 10;
    const hashedKey = bcrypt_1.default.hashSync(key, saltRounds);
    return hashedKey;
};
exports.generateSecretKey = generateSecretKey;
