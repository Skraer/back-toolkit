const fs = require('fs')
const path = require('path')
const paths = require('../paths')
const { getArgAfter } = require('../utils/getArgAfter')
const { config, replaceTemplate } = require('../utils/template')

const rawArgs = process.argv.slice(2)

const generate = () => {
  // controller
  if (rawArgs.includes('/c')) {
    console.log(paths.root);
    const name = getArgAfter('/c')
    const fileName = name[0].toUpperCase() + name.slice(1).toLowerCase() + 'Controller.ts'

    const textData = fs.readFileSync(path.join(paths.root, 'src', '_templates', 'controller.ts')).toString()
    const resultTextData = textData.replace(config.patternRegExp, (str) => replaceTemplate(str, name))
    fs.writeFileSync(
      path.join(paths.execRoot, 'src', 'controllers', fileName),
      Buffer.from(resultTextData)
    )
  }
}


exports.generate = generate