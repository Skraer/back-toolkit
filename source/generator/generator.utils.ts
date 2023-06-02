import { ArgFlagType, ArgsType } from '../argparser/argparser'

export type TemplateType = {
  fileName: string
  content: string
}

type FilterType = 'U' | 'L' | 'P' | 'C'
const isFilter = (val: string) => ['U', 'L', 'P', 'C'].includes(val)

export const toPascalCase = (str: string) => str[0].toUpperCase() + str.substring(1)
export const toCamelCase = (str: string) => str[0].toLowerCase() + str.substring(1)

export const config = {
  pattern: /{{([\s\S]*?)}}/gm,
  patternsConditional: {
    outer: /{{((?:\[[.\s\S]*?\])+.*?)}}/gm,
    inner: /\[([.\s\S]*?)\]/g,
  },
  filters: {
    U: (input: string) => input.toUpperCase(),
    L: (input: string) => input.toLowerCase(),
    P: (input: string) => toPascalCase(input),
    C: (input: string) => toCamelCase(input),
  },
}

export const replacePattern = (
  content: string,
  input: string,
  variables?: { [key: string]: string | number | boolean }
): string => {
  return content.replace(config.pattern, (str, inner: FilterType | string) => {
    if (isFilter(inner)) return config.filters[inner as FilterType](input)
    if (variables && variables[inner]) return variables[inner].toString()
    return input
  })
}

export const replaceConditonalPattern = (content: string, flags: ArgsType['flags']) => {
  content = content.replace(config.patternsConditional.outer, (str, inner: string) => {
    const matches = inner.match(config.patternsConditional.inner)

    if (matches && matches.length) {
      const flag = matches[0].replace(config.patternsConditional.inner, (_, f) => f)
      const value = matches[1].replace(config.patternsConditional.inner, (_, v) => v)

      if (flag.startsWith('!')) return !flags[flag.substring(1) as ArgFlagType] ? value : ''
      else return flags[flag as ArgFlagType] ? value : ''
    }

    return str
  })

  return content
}

export type GeneratorItemType = 'model' | 'controller' | 'service' | 'middleware'
