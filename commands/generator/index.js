const path = require('path')

const rawArgs = process.argv.slice(2)

const { getArgAfter } = require('../../utils/getArgAfter')

const { getTplText, replaceAllTemplates, expandBlocksWithArg, writeFileTo, getFileName } = require('./utils')
const paths = require('../../paths')

const generate = () => {
  const fullArg = rawArgs.find(arg => arg.startsWith('gen'))
  const args = fullArg.split(':')
  const name = getArgAfter(fullArg)

  let templateFileName, outputDirName, outputPostfix

  if (args.includes('c')) {
    templateFileName = 'controller.ts'
    outputDirName = 'controllers'
    outputPostfix = 'Controller.ts'
  }
  if (args.includes('m')) {
    templateFileName = 'model.ts'
    outputDirName = 'models'
    outputPostfix = '.ts'
  }
  if (args.includes('s')) {
    templateFileName = 'service.ts'
    outputDirName = 'services'
    outputPostfix = 'Service.ts'
  }
  if (args.includes('mw')) {
    templateFileName = 'middleware.ts'
    outputDirName = 'middlewares'
    outputPostfix = 'Middleware.ts'
  }

  let textData = getTplText(templateFileName)
  textData = expandBlocksWithArg(textData)
  textData = replaceAllTemplates(textData, name)

  writeFileTo(
    path.join(paths.execRoot, 'src', outputDirName, getFileName(name, outputPostfix)),
    textData
  )
}

module.exports = generate