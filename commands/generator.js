const fs = require('fs')
const path = require('path')
const paths = require('../paths')
const { getArgAfter } = require('../utils/getArgAfter')
const { config, replaceTemplate } = require('../utils/template')
const { makeDir } = require('./utils/dirMethods')

const rawArgs = process.argv.slice(2)

const getTplText = (fileName) =>
  fs.readFileSync(path.join(paths.root, 'src', '_templates', fileName)).toString()

const replaceAllTemplates = (textData, input) =>
  textData.replace(config.patternNew, (str) => replaceTemplate(str, input))

const replaceBlocksWithMongo = (textData) => {
  return textData.replace(
    config.patternBlockNew,
    (str, content) => replaceTemplate(str, rawArgs.includes('-mongo') ? content : '')
  )
}

const writeFileTo = (pathTo, textData) => {
  makeDir(path.join(...pathTo.split(/[\/\\]/g).slice(0, -1)))
  fs.writeFileSync(
    path.join(pathTo),
    Buffer.from(textData.trim())
  )
}

const generateController = (name) => {
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + 'Controller.ts'

  const textData = getTplText('controller.ts')
  let resultTextData = replaceAllTemplates(textData, name)

  writeFileTo(
    path.join(paths.execRoot, 'src', 'controllers', fileName),
    resultTextData
  )
}

const generateModel = (name) => {
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + '.ts'

  const textData = getTplText('modelNew.ts')
  let resultTextData = replaceAllTemplates(textData, name)

  resultTextData = replaceBlocksWithMongo(resultTextData)

  writeFileTo(
    path.join(paths.execRoot, 'src', 'models', fileName),
    resultTextData
  )
}

const generateService = (name) => {
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + 'Service.ts'

  const textData = getTplText('service.ts')
  let resultTextData = replaceAllTemplates(textData, name)

  resultTextData = replaceBlocksWithMongo(resultTextData)

  writeFileTo(
    path.join(paths.execRoot, 'src', 'services', fileName),
    resultTextData
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
}


exports.generate = generate