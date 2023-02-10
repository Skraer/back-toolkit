const fs = require('fs')
const path = require('path')

const { makeDir } = require('../utils/dirMethods')
const paths = require('../../paths')
const config = require('./config')

const rawArgs = process.argv.slice(2)

const replaceTemplate = (template, input) => {
  const splitted = template.split(config.separator)
  const filter = splitted[1] ? splitted[1][0] : null

  switch (filter) {
    case config.lowerCase:
      return input.toLowerCase()
    case config.upperCase:
      return input.toUpperCase()
    case config.titleCase:
      return input[0].toUpperCase() + input.substr(1).toLowerCase()
    default:
      return input
  }
}

const writeFileTo = (pathTo, textData) => {
  makeDir(path.join(...pathTo.split(/[\/\\]/g).slice(0, -1)))
  fs.writeFileSync(path.join(pathTo), Buffer.from(textData.trim()))
  return pathTo
}

const getTplText = (fileName) =>
  fs
    .readFileSync(path.join(paths.root, 'src', '_templates', fileName))
    .toString()

const replaceAllTemplates = (textData, input) =>
  textData.replace(config.pattern, (str) => replaceTemplate(str, input))

const expandBlocksWithArg = (textData) => {
  return textData.replace(config.patternBlock, (str, argsT, content) =>
    rawArgs.some((arg) => argsT.includes(arg)) ? content : ''
  )
}

const expandSwitchBlocks = (textData) => {
  const cliArgs = rawArgs.map((arg) => arg.replace(/\!/g, ''))

  return textData.replace(config.patternSwitch, (str, matched) => {
    return matched
      .replace(config.patternSwitchItem, (str, argsT, content) => {
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

const getFileName = (name, postfix) => {
  if (postfix === undefined) {
    throw new Error('Postfix was not passed')
  }
  if (typeof postfix !== 'string') {
    throw new Error('Postfix must be a string')
  }
  if (name.length <= 1) {
    throw new Error('Name must have at least 2 chars')
  }
  return name[0].toUpperCase() + name.slice(1) + postfix
}

exports.getTplText = getTplText
exports.writeFileTo = writeFileTo
exports.replaceAllTemplates = replaceAllTemplates
exports.expandBlocksWithArg = expandBlocksWithArg
exports.expandSwitchBlocks = expandSwitchBlocks
exports.getFileName = getFileName
