const fs = require('fs')
const path = require('path')
const { makeDir } = require('./dirMethods')

const copyFile = (fromPath, toPath) => {
  const src = path.join(__dirname, '../../', fromPath)
  const output = path.join(process.cwd(), '/', toPath)

  const pathArr = toPath.split(/[\/\\]/g)
  if (pathArr.length > 1) {
    const dir = pathArr.slice(0, pathArr.length - 1).join('/')
    makeDir(dir)
  }

  // makeDir(output)
  // console.error('src: ', src);
  // console.error('output: ', output);

  const rawData = fs.readFileSync(path.join(src))
  // const nodemonConfig = fs.readFileSync(path.join(configPaths, 'nodemon.json'))

  fs.writeFileSync(output, rawData)
  // fs.writeFileSync(output + 'nodemon.json', nodemonConfig)
}

exports.copyFile = copyFile