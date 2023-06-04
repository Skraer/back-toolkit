import { GeneratorItemType } from './generator.utils'
import args from '../argparser/argparser'
import { generateSecretKey } from '../utils/generateSecretKey'
import { Generator } from './generator.constructor'

const generateItem = (type: GeneratorItemType, name: string) => {
  const entity = new Generator({
    input: name,
    pathTo: [`${type}s`],
    relativePath: `${type}s/_${type}.yaml`,
  })
    .replaceContent()
    .writeContent()

  console.log(`${entity.fileName} was generated`)
}

export const generate = () => {
  const { gen } = args

  Object.keys(gen).forEach((name) => {
    if (gen[name].includes('m')) generateItem('model', name)
    if (gen[name].includes('c')) generateItem('controller', name)
    if (gen[name].includes('s')) generateItem('service', name)
    if (gen[name].includes('mw')) generateItem('middleware', name)
  })
}

export const generateMongoModule = () => {
  new Generator({
    relativePath: 'services/MongoService/index.yaml',
    pathTo: ['services', 'MongoService'],
  }).writeContent()

  new Generator({
    relativePath: 'services/MongoService/interface.yaml',
    pathTo: ['services', 'MongoService'],
  }).writeContent()

  new Generator({
    relativePath: 'services/MongoService/serviceWithMongo.yaml',
    pathTo: ['services', 'MongoService'],
  }).writeContent()
}

export const generate3rdPartyModule = () => {
  new Generator({
    relativePath: 'services/ThirdPartyRequestService.yaml',
    pathTo: ['services'],
  }).writeContent()
}

export const generateErrorHandlerModule = () => {
  new Generator({
    relativePath: 'utils/errorHandler/dictionary.yaml',
    pathTo: ['utils', 'errorHandler'],
  }).writeContent()
  new Generator({
    relativePath: 'utils/errorHandler/index.yaml',
    pathTo: ['utils', 'errorHandler'],
  }).writeContent()
  new Generator({
    relativePath: 'controllers/utils.yaml',
    pathTo: ['controllers'],
  }).writeContent()
}

export const generateConfig = () => {
  const access = generateSecretKey()
  const refresh = generateSecretKey()
  new Generator({ relativePath: 'config.yaml', variables: { access, refresh } })
    .replaceContent()
    .writeContent()
}
