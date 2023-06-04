"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceConditonalPattern = exports.replacePattern = exports.generatorConfig = exports.toCamelCase = exports.toPascalCase = void 0;
const isFilter = (val) => ['U', 'L', 'P', 'C'].includes(val);
const toPascalCase = (str) => str[0].toUpperCase() + str.substring(1);
exports.toPascalCase = toPascalCase;
const toCamelCase = (str) => str[0].toLowerCase() + str.substring(1);
exports.toCamelCase = toCamelCase;
exports.generatorConfig = {
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
const replacePattern = (content, input, variables) => {
    return content.replace(exports.generatorConfig.pattern, (str, inner) => {
        if (isFilter(inner))
            return exports.generatorConfig.filters[inner](input);
        if (variables && variables[inner])
            return variables[inner].toString();
        return input;
    });
};
exports.replacePattern = replacePattern;
const replaceConditonalPattern = (content, flags) => {
    return content.replace(exports.generatorConfig.patternsConditional.outer, (str, inner) => {
        const matches = inner.match(exports.generatorConfig.patternsConditional.inner);
        if (matches && matches.length) {
            const flag = matches[0].replace(exports.generatorConfig.patternsConditional.inner, (_, f) => f);
            const value = matches[1].replace(exports.generatorConfig.patternsConditional.inner, (_, v) => v);
            if (flag.startsWith('!'))
                return !flags[flag.substring(1)] ? value : '';
            else
                return flags[flag] ? value : '';
        }
        return str;
    });
};
exports.replaceConditonalPattern = replaceConditonalPattern;
