const path = require('path')

const rawArgs = process.argv.slice(2)

const { getArgAfter } = require('../../utils/getArgAfter')

const {
  getTplText,
  replaceAllTemplates,
  expandBlocksWithArg,
  writeFileTo,
  getFileName,
} = require('./utils')
const paths = require('../../paths')
const { installMongoDeps } = require('../installing')
const { copyFile } = require('../utils/copyFile')

const handleTextData = (tplName, name) => {
  let textData = getTplText(tplName)
  textData = expandBlocksWithArg(textData)
  textData = replaceAllTemplates(textData, name)
  return textData
}

const generateController = (name) => {
  const textData = handleTextData('controller.ts', name)
  const distPath = writeFileTo(
    path.join(
      paths.execRoot,
      'src',
      'controllers',
      getFileName(name, 'Controller.ts')
    ),
    textData
  )
  console.log(`Controller ${name} was created in: ${distPath}`)
}

const generateModel = (name) => {
  const textData = handleTextData('model.ts', name)
  const distPath = writeFileTo(
    path.join(paths.execRoot, 'src', 'models', getFileName(name, '.ts')),
    textData
  )
  console.log(`Model ${name} was created in: ${distPath}`)
}

const generateService = (name) => {
  const textData = handleTextData('service.ts', name)
  const distPath = writeFileTo(
    path.join(
      paths.execRoot,
      'src',
      'services',
      getFileName(name, 'Service.ts')
    ),
    textData
  )
  console.log(`Service ${name} was created in: ${distPath}`)
}

const generateMiddleware = (name) => {
  const textData = handleTextData('middleware.ts', name)
  const distPath = writeFileTo(
    path.join(
      paths.execRoot,
      'src',
      'middlewares',
      getFileName(name, 'Middleware.ts')
    ),
    textData
  )
  console.log(`Moddleware ${name} was created in: ${distPath}`)
}

const generateModuleMongo = () => {
  const servicePath = '/src/services/MongoService'
  installMongoDeps()
  copyFile(servicePath + '/interface.ts')
  copyFile(servicePath + '/index.ts')
  copyFile('/src/models/MongoDoc.ts')
  console.log(`Mongo module was created in: ${servicePath}`)
}

const generate3rdParty = () => {
  const modulePath = '/src/services/ThirdPartyRequestService.ts'
  copyFile(modulePath)
  console.log(`3rd party module was created in: ${modulePath}`)
}

const generate = () => {
  const fullArg = rawArgs.find((arg) => arg.startsWith('gen'))
  const args = fullArg.split(':')
  const name = getArgAfter(fullArg)

  if (args.includes('module')) {
    if (args.includes('mongo')) {
      generateModuleMongo()
    }
    if (args.includes('3rdparty')) {
      generate3rdParty()
    }
  } else {
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
}

module.exports = generate
