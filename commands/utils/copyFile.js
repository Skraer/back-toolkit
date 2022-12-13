const fs = require('fs')
const path = require('path')
const { makeDir } = require('./dirMethods')

const copyFile = (fromPath, toPath) => {
  toPath = toPath || fromPath
  const src = path.join(__dirname, '../../', fromPath)
  const output = path.join(process.cwd(), '/', toPath)

  const pathArr = toPath.split(/[\/\\]/g)
  if (pathArr.length > 1) {
    const dir = pathArr.slice(0, pathArr.length - 1).join('/')
    makeDir(dir)
  }

  const rawData = fs.readFileSync(path.join(src))

  fs.writeFileSync(output, rawData)
}

const copyDir = (fromPath, toPath) => {
  toPath = toPath || fromPath
  if (
    !fromPath.endsWith('/') ||
    !fromPath.endsWith('\\') ||
    !toPath.endsWith('/') ||
    !toPath.endsWith('\\')
  ) {
    throw new Error('Path must be end with / or \\')
  }

  const src = path.join(__dirname, '../../', fromPath)
  const output = path.join(process.cwd(), '/', toPath)

  const pathArr = toPath.split(/[\/\\]/g)
  if (pathArr.length > 1) {
    const dir = pathArr.slice(0, pathArr.length - 1).join('/')
    makeDir(dir)
  }

  const files = fs.readdirSync(path.join(src))
  files.forEach((fileName) => {
    const rawData = fs.readFileSync(path.join(fileName))

    fs.writeFileSync(output, rawData)
  })
}

exports.copyFile = copyFile
exports.copyDir = copyDir
