import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import {
  GeneratorItemType,
  TemplateType,
  replaceConditonalPattern,
  replacePattern,
  toPascalCase,
} from './generator.utils'
import paths from '../paths'
import { writeFileTo } from '../utils/writeFileTo'
import args from '../argparser/argparser'
import { generateSecretKey } from '../utils/generateSecretKey'

const getTemplate = (relativePath: string): TemplateType => {
  try {
    const splitted = relativePath.split(/\\|\//g)
    const doc = yaml.load(
      fs.readFileSync(path.join(paths.root, 'templates', ...splitted), { encoding: 'utf8' })
    ) as TemplateType
    return doc
  } catch (err: any) {
    throw new Error(`Failed parse template on path ${relativePath}. Error: ` + err)
  }
}

export const writeSimpleTemplate = (relativePath: string, pathTo: string) => {
  const template = getTemplate(relativePath)
  writeFileTo(path.join(paths.execRoot, pathTo, template.fileName), template.content)
}

const generator = (type: GeneratorItemType, name: string) => {
  const template = getTemplate(`${type}s/_${type}.yaml`)
  let content = replaceConditonalPattern(template.content, args.flags)
  content = replacePattern(content, name)
  writeFileTo(
    path.join(paths.execRoot, paths.outputDir, `${type}s`, replacePattern(template.fileName, name)),
    content
  )
  console.log(`${toPascalCase(type)} ${name} was generated`)
}

const generateModel = generator.bind(null, 'model')
const generateController = generator.bind(null, 'controller')
const generateService = generator.bind(null, 'service')
const generateMiddleware = generator.bind(null, 'middleware')

export const generate = () => {
  const { gen } = args

  Object.keys(gen).forEach((name) => {
    if (gen[name].includes('m')) generateModel(name)
    if (gen[name].includes('c')) generateController(name)
    if (gen[name].includes('s')) generateService(name)
    if (gen[name].includes('mw')) generateMiddleware(name)
  })
}

export const generateMongoModule = () => {
  writeSimpleTemplate(
    'services/MongoService/index.yaml',
    paths.outputDir + '/services/MongoService'
  )
  writeSimpleTemplate(
    'services/MongoService/interface.yaml',
    paths.outputDir + '/services/MongoService'
  )
  writeSimpleTemplate(
    'services/MongoService/serviceWithMongo.yaml',
    paths.outputDir + '/services/MongoService'
  )
}

export const generate3rdPartyModule = () => {
  writeSimpleTemplate('services/ThirdPartyRequestService.yaml', paths.outputDir + '/services')
}

export const generateErrorHandlerModule = () => {
  writeSimpleTemplate('utils/errorHandler/dictionary.yaml', paths.outputDir + '/utils/errorHandler')
  writeSimpleTemplate('utils/errorHandler/index.yaml', paths.outputDir + '/utils/errorHandler')
  writeSimpleTemplate('controllers/utils.yaml', paths.outputDir + '/controllers')
}

export const generateConfig = () => {
  const access = generateSecretKey()
  const refresh = generateSecretKey()
  const template = getTemplate('config.yaml')
  let content = replaceConditonalPattern(template.content, args.flags)
  content = replacePattern(content, '', { access, refresh })
  writeFileTo(path.join(paths.execRoot, paths.outputDir, template.fileName), content)
}
