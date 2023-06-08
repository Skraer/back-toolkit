import { GeneratorItemType } from './generator.utils'
import args from '../argparser/argparser'
import { generateSecretKey } from '../utils/generateSecretKey'
import { Generator } from './generator.constructor'
import { logAfterMessage } from '../consoleMessages'

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

  logAfterMessage('modules', 'mongo')
}

export const generate3rdPartyModule = () => {
  new Generator({
    relativePath: 'services/ThirdPartyRequestService.yaml',
    pathTo: ['services'],
  }).writeContent()
  logAfterMessage('modules', '3rdparty')
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
  const utils = new Generator({
    relativePath: 'controllers/utils.yaml',
    pathTo: ['controllers'],
  })
    .replaceContent()
    .writeContent()
  console.log('utils', utils)
}

export const generateConfig = () => {
  const pathTo = ['config']
  new Generator({ relativePath: 'config/index.yaml', pathTo }).replaceContent().writeContent()
  const access = generateSecretKey()
  const refresh = generateSecretKey()
  new Generator({
    relativePath: 'config/auth.yaml',
    pathTo,
    variables: { access, refresh },
  })
    .replaceContent()
    .writeContent()
}

export const generateAuthModule = () => {
  new Generator({
    relativePath: 'services/AuthService/index.yaml',
    pathTo: ['services', 'AuthService'],
  }).writeContent()
  new Generator({
    relativePath: 'services/AuthService/utils.yaml',
    pathTo: ['services', 'AuthService'],
  }).writeContent()
  new Generator({
    relativePath: 'models/Auth.yaml',
    pathTo: ['models'],
  }).writeContent()
  new Generator({
    relativePath: 'controllers/AuthController.yaml',
    pathTo: ['controllers'],
  }).writeContent()
  new Generator({
    relativePath: 'middlewares/AuthMiddleware.yaml',
    pathTo: ['middlewares'],
  }).writeContent()

  logAfterMessage('modules', 'auth')
}
