import path from 'path'

const rawArgs = process.argv.slice(2)

import { getArgAfter } from '../../utils/getArgAfter'

import {
  getTplText,
  replaceAllTemplates,
  expandBlocksWithArg,
  writeFileTo,
  getFileName,
  expandSwitchBlocks,
} from './utils'
import paths from '../../paths'
import { installMongoDeps } from '../installing'
import { copyFile } from '../utils/copyFile'

const handleTextData = (tplName: string, name: string) => {
  let textData = getTplText(tplName)
  textData = expandSwitchBlocks(textData)
  textData = expandBlocksWithArg(textData)
  textData = replaceAllTemplates(textData, name)
  return textData
}

const generateController = (name: string) => {
  const textData = handleTextData('controller.ts', name)
  const distPath = writeFileTo(
    path.join(paths.execRoot, 'src', 'controllers', getFileName(name, 'Controller.ts')),
    textData
  )
  console.log(`Controller ${name} was created in: ${distPath}`)
}

const generateModel = (name: string) => {
  const textData = handleTextData('model.ts', name)
  const distPath = writeFileTo(
    path.join(paths.execRoot, 'src', 'models', getFileName(name, '.ts')),
    textData
  )
  console.log(`Model ${name} was created in: ${distPath}`)
}

const generateService = (name: string) => {
  const textData = handleTextData('service.ts', name)
  const distPath = writeFileTo(
    path.join(paths.execRoot, 'src', 'services', getFileName(name, 'Service.ts')),
    textData
  )
  console.log(`Service ${name} was created in: ${distPath}`)
}

const generateMiddleware = (name: string) => {
  const textData = handleTextData('middleware.ts', name)
  const distPath = writeFileTo(
    path.join(paths.execRoot, 'src', 'middlewares', getFileName(name, 'Middleware.ts')),
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

  if (fullArg) {
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
}

export default generate
