const fs = require('fs')
const path = require('path')

const copyConfigs = () => {
  const outputRoot = path.join(process.cwd())
  const configPaths = path.join(__dirname, '../src/')
  const tsConfig = fs.readFileSync(path.join(configPaths, 'tsconfig.json'))
  const nodemonConfig = fs.readFileSync(path.join(configPaths, 'nodemon.json'))

  fs.writeFileSync(outputRoot + '/tsconfig.json', tsConfig)
  fs.writeFileSync(outputRoot + '/nodemon.json', nodemonConfig)
}

exports.copyConfigs = copyConfigs
