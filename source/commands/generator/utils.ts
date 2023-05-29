import fs from 'fs'
import path from 'path'

import { makeDir } from '../utils/dirMethods'
import paths from '../../paths'
import config from './config'

const rawArgs = process.argv.slice(2)

const replaceTemplate = (template: string, input: string) => {
  const splitted = template.split(config.separator)
  const filter = splitted[1] ? splitted[1][0] : null

  switch (filter) {
    case config.lowerCase:
      return input.toLowerCase()
    case config.upperCase:
      return input.toUpperCase()
    case config.firstUpper:
      return input[0].toUpperCase() + input.substr(1)
    case config.firstLower:
      return input[0].toLowerCase() + input.substr(1)
    default:
      return input
  }
}

export const writeFileTo = (pathTo: string, textData: string) => {
  makeDir(path.join(...pathTo.split(/[\/\\]/g).slice(0, -1)))
  fs.writeFileSync(path.join(pathTo), Buffer.from(textData.trim()))
  return pathTo
}

export const getTplText = (fileName: string) =>
  fs.readFileSync(path.join(paths.root, 'src', '_templates', fileName)).toString()

export const replaceAllTemplates = (textData: string, input: string) =>
  textData.replace(config.pattern, (str) => replaceTemplate(str, input))

export const expandBlocksWithArg = (textData: string) => {
  return textData.replace(config.patternBlock, (str, argsT, content) =>
    rawArgs.some((arg) => argsT.includes(arg)) ? content : ''
  )
}

export const expandSwitchBlocks = (textData: string) => {
  const cliArgs = rawArgs.map((arg) => arg.replace(/\!/g, ''))

  return textData.replace(config.patternSwitch, (str, matched: string) => {
    return matched
      .replace(config.patternSwitchItem, (str, argsT: string, content: string) => {
        let passed = true

        const templateArgs = argsT.split(',').map((el) => el.trim())

        templateArgs.forEach((argT) => {
          if (argT.startsWith('!')) {
            if (cliArgs.includes(argT.slice(1))) {
              passed = false
            }
          } else if (!cliArgs.includes(argT)) {
            passed = false
          }
        })

        return passed ? content.trim() : ''
      })
      .trim()
  })
}

// const expandBlocksWithArg = (textData) => {
//   const cliArgs = rawArgs.map((arg) => arg.replace(/\!/g, ''))

//   return textData.replace(config.patternBlock, (str, argsT, content) => {
//     let pass = true

//     const templateArgs = argsT.split(',').map((el) => el.trim())

//     templateArgs.forEach((argT) => {
//       if (argT.startsWith('!')) {
//         if (cliArgs.includes(argT.slice(1))) {
//           pass = false
//         }
//       } else if (!cliArgs.includes(argT)) {
//         pass = false
//       }
//     })

//     return pass ? content : ''
//   })
// }

export const getFileName = (name: string, postfix?: string) => {
  if (postfix === undefined) {
    throw new Error('Postfix was not passed')
  }
  if (typeof postfix !== 'string') {
    throw new Error('Postfix must be a string')
  }
  if (name.length <= 1) {
    throw new Error('Name must have at least 2 chars')
  }
  const result = name[0].toUpperCase() + name.slice(1) + postfix
  return result
}
