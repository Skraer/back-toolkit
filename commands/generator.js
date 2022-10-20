const fs = require('fs')
const path = require('path')
const paths = require('../paths')
const { getArgAfter } = require('../utils/getArgAfter')
const { config, replaceTemplate } = require('../utils/template')

const rawArgs = process.argv.slice(2)

const getTplText = (fileName) =>
  fs.readFileSync(path.join(paths.root, 'src', '_templates', fileName)).toString()

const replaceAllTemplates = (textData, input) =>
  textData.replace(config.patternRegExp, (str) => replaceTemplate(str, input))

const replaceBlocksWithMongo = (textData) => {
  return textData.replace(
    config.patternBlockMongoRegExp,
    (str, content) => replaceTemplate(str, rawArgs.includes('-mongo') ? content : '')
  )
}

const writeFileTo = (pathTo, textData) => {
  fs.writeFileSync(
    path.join(pathTo),
    Buffer.from(textData.trim())
  )
}

const generateController = () => {
  const name = getArgAfter('/c')
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + 'Controller.ts'

  const textData = getTplText('controller.ts')
  let resultTextData = replaceAllTemplates(textData, name)
  // let resultTextData = textData.replace(config.patternRegExp, (str) => replaceTemplate(str, name))

  writeFileTo(
    path.join(paths.execRoot, 'src', 'controllers', fileName),
    resultTextData
  )
  // fs.writeFileSync(
  //   path.join(paths.execRoot, 'src', 'controllers', fileName),
  //   Buffer.from(resultTextData.trim())
  // )
}

const generateModel = () => {
  const name = getArgAfter('/m')
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + '.ts'

  const textData = getTplText('model.ts')
  let resultTextData = replaceAllTemplates(textData, name)

  // let resultTextData = textData.replace(config.patternRegExp, (str) => replaceTemplate(str, name))

  resultTextData = replaceBlocksWithMongo(resultTextData)

  writeFileTo(
    path.join(paths.execRoot, 'src', 'models', fileName),
    resultTextData
  )
  // fs.writeFileSync(
  //   path.join(paths.execRoot, 'src', 'models', fileName),
  //   Buffer.from(resultTextData.trim())
  // )
}

const generateService = () => {
  const name = getArgAfter('/s')
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + 'Service.ts'

  const textData = getTplText('service.ts')
  let resultTextData = replaceAllTemplates(textData, name)

  resultTextData = replaceBlocksWithMongo(resultTextData)

  // resultTextData = resultTextData.replace(
  //   config.patternBlockMongoRegExp,
  //   (str, content) => replaceTemplate(str, rawArgs.includes('-mongo') ? content : '')
  // )

  console.log(resultTextData);

  writeFileTo(
    path.join(paths.execRoot, 'src', 'services', fileName),
    resultTextData
  )
}

const generate = () => {
  if (rawArgs.includes('/c')) {
    generateController()
  }
  if (rawArgs.includes('/m')) {
    generateModel()
  }
  if (rawArgs.includes('/s')) {
    generateService()
  }
}


exports.generate = generate