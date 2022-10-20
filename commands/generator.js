const fs = require('fs')
const path = require('path')
const paths = require('../paths')
const { getArgAfter } = require('../utils/getArgAfter')
const { config, replaceTemplate } = require('../utils/template')

const rawArgs = process.argv.slice(2)

const generateController = () => {
  const name = getArgAfter('/c')
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + 'Controller.ts'

  const textData = fs.readFileSync(path.join(paths.root, 'src', '_templates', 'controller.ts')).toString()
  let resultTextData = textData.replace(config.patternRegExp, (str) => replaceTemplate(str, name))

  fs.writeFileSync(
    path.join(paths.execRoot, 'src', 'controllers', fileName),
    Buffer.from(resultTextData.trim())
  )
}

const generateModel = () => {
  const name = getArgAfter('/m')
  const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + '.ts'

  const textData = fs.readFileSync(path.join(paths.root, 'src', '_templates', 'model.ts')).toString()
  let resultTextData = textData.replace(config.patternRegExp, (str) => replaceTemplate(str, name))

  resultTextData = resultTextData.replace(
    config.patternBlockMongoRegExp,
    (str, content) => replaceTemplate(str, rawArgs.includes('-mongo') ? content : '')
  )

  fs.writeFileSync(
    path.join(paths.execRoot, 'src', 'models', fileName),
    Buffer.from(resultTextData.trim())
  )
}

const generate = () => {
  if (rawArgs.includes('/c')) {
    generateController()
  }
  if (rawArgs.includes('/m')) {
    generateModel()
  }
}


exports.generate = generate