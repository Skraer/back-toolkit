import { ArgFlagType, ArgsType, ModuleType, args } from '../argparser'

export type TemplateType = {
  fileName: string
  content: string
  writeIf?: string[]
  variables?: { [key: string]: string | number | boolean }
}

type FilterType = 'U' | 'L' | 'P' | 'C'
const isFilter = (val: string) => ['U', 'L', 'P', 'C'].includes(val)

export const toPascalCase = (str: string) => str[0].toUpperCase() + str.substring(1)
export const toCamelCase = (str: string) => str[0].toLowerCase() + str.substring(1)

export type GenConfigType = {
  pattern: RegExp
  patternsConditional: {
    outer: RegExp
    inner: RegExp
    withVar: RegExp
  }
  filters: {
    [key in FilterType]: (input: string) => string
  }
}

export const generatorConfig: GenConfigType = {
  pattern: /\{\{([\w\s\d]+?)\}\}/gm,
  patternsConditional: {
    outer: /\{\{((?:\[[.\s\S]*?\])+.*?)\}\}/gm,
    inner: /\[([.\s\S]*?)\]/g,
    withVar: /\<\%([\w\s\d]+?)\%\>/g,
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
  return content.replace(generatorConfig.pattern, (str, inner: FilterType | string) => {
    if (isFilter(inner)) return generatorConfig.filters[inner as FilterType](input)
    if (variables && variables[inner]) return variables[inner].toString()
    return input
  })
}

export const replaceConditonalPattern = (content: string, flags: ArgsType['flags']) => {
  return content.replace(generatorConfig.patternsConditional.outer, (str, inner: string) => {
    const matches = inner.match(generatorConfig.patternsConditional.inner)

    if (matches && matches.length) {
      const cond = matches[0].replace(generatorConfig.patternsConditional.inner, (_, f) => f)
      const value = matches[1].replace(generatorConfig.patternsConditional.inner, (_, v) => v)

      let val = ''

      if (cond.startsWith('m:')) {
        const modules = cond.split(':').slice(1)
        const condPassed = modules.every((m) => args.modules.includes(m as ModuleType))
        val = condPassed ? value : ''
      } else {
        if (cond.startsWith('!')) val = !flags[cond.substring(1) as ArgFlagType] ? value : ''
        else val = flags[cond as ArgFlagType] ? value : ''
      }

      val = val.replace(
        generatorConfig.patternsConditional.withVar,
        (str, varName) => `{{${varName}}}`
      )
      return val
    }

    return str
  })
}

export type GeneratorItemType = 'model' | 'controller' | 'service' | 'middleware'
