const fs = require('fs')
const path = require('path')
const { makeDir } = require('./makeDir')

const copyFile = (fromPath, toPath) => {
  const src = path.join(__dirname, '../../', fromPath)
  const output = path.join(process.cwd(), '/', toPath)

  makeDir(output)
  // console.error('src: ', src);
  // console.error('output: ', output);

  const rawData = fs.readFileSync(path.join(src))
  // const nodemonConfig = fs.readFileSync(path.join(configPaths, 'nodemon.json'))

  fs.writeFileSync(output, rawData)
  // fs.writeFileSync(output + 'nodemon.json', nodemonConfig)
}

exports.copyFile = copyFile