const path = require('path')

const rawArgs = process.argv.slice(2)

const { getArgAfter } = require('../../utils/getArgAfter')

const { getTplText, replaceAllTemplates, expandBlocksWithArg, writeFileTo, getFileName } = require('./utils')
const paths = require('../../paths')

const handleTextData = (tplName, name) => {
  let textData = getTplText(tplName)
  textData = expandBlocksWithArg(textData)
  textData = replaceAllTemplates(textData, name)
  return textData
}

const generateController = (name) => {
  const textData = handleTextData('controller.ts', name)
  writeFileTo(
    path.join(paths.execRoot, 'src', 'controllers', getFileName(name, 'Controller.ts')),
    textData
  )
}

const generateModel = (name) => {
  const textData = handleTextData('model.ts', name)
  writeFileTo(
    path.join(paths.execRoot, 'src', 'models', getFileName(name, '.ts')),
    textData
  )
}

const generateService = (name) => {
  const textData = handleTextData('service.ts', name)
  writeFileTo(
    path.join(paths.execRoot, 'src', 'services', getFileName(name, 'Service.ts')),
    textData
  )
}

const generateMiddleware = (name) => {
  const textData = handleTextData('middleware.ts', name)
  writeFileTo(
    path.join(paths.execRoot, 'src', 'middlewares', getFileName(name, 'Middleware.ts')),
    textData
  )
}

const generate = () => {
  const fullArg = rawArgs.find(arg => arg.startsWith('gen'))
  const args = fullArg.split(':')
  const name = getArgAfter(fullArg)

  if (args.includes('c')) {
    generateController(name)
  }
  if (args.includes('m')) {
    generateModel(name)
  }
  if (args.includes('s')) {
    generateService(name)
  }
  if (args.includes('mw')) {
    generateMiddleware(name)
  }
}

module.exports = generate