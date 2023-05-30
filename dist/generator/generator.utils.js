"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceConditonalPattern = exports.replacePattern = exports.config = exports.toCamelCase = exports.toPascalCase = void 0;
const isFilter = (val) => ['U', 'L', 'P', 'C'].includes(val);
const toPascalCase = (str) => str[0].toUpperCase() + str.substring(1);
exports.toPascalCase = toPascalCase;
const toCamelCase = (str) => str[0].toLowerCase() + str.substring(1);
exports.toCamelCase = toCamelCase;
exports.config = {
    pattern: /{{([\s\S]*?)}}/gm,
    patternsConditional: {
        outer: /{{((?:\[[.\s\S]*?\])+.*?)}}/gm,
        inner: /\[([.\s\S]*?)\]/g,
    },
    filters: {
        U: (input) => input.toUpperCase(),
        L: (input) => input.toLowerCase(),
        P: (input) => (0, exports.toPascalCase)(input),
        C: (input) => (0, exports.toCamelCase)(input),
    },
};
const replacePattern = (content, input) => {
    return content.replace(exports.config.pattern, (str, modifier) => {
        if (isFilter(modifier))
            return exports.config.filters[modifier](input);
        return input;
    });
};
exports.replacePattern = replacePattern;
const replaceConditonalPattern = (content, flags) => {
    content = content.replace(exports.config.patternsConditional.outer, (str, inner) => {
        const matches = inner.match(exports.config.patternsConditional.inner);
        if (matches && matches.length) {
            const flag = matches[0].replace(exports.config.patternsConditional.inner, (_, f) => f);
            const value = matches[1].replace(exports.config.patternsConditional.inner, (_, v) => v);
            if (flag.startsWith('!'))
                return !flags[flag.substring(1)] ? value : '';
            else
                return flags[flag] ? value : '';
        }
        return str;
    });
    return content;
};
exports.replaceConditonalPattern = replaceConditonalPattern;
