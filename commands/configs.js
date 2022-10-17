const fs = require('fs')
const path = require('path')
// const { source } = require('./paths')
const outputRoot = path.join(process.cwd())

const createTsConfig = () => {
  // const srcDir = source.toString()
  // if (!fs.existsSync(path.join(srcDir))) {
  //   fs.mkdirSync(path.join(srcDir))
  // }

  // for (let dir in source) {
  //   if (dir === 'toString') continue
  //   if (!fs.existsSync(path.join(source[dir]))) {
  //     fs.mkdirSync(path.join(source[dir]))
  //   }
  // }

  const rawData = fs.readFileSync('../source/tsconfig.json')
  fs.writeFileSync(outputRoot, rawData)
}
// createStructure()

exports.createTsConfig = createTsConfig

// module.exports = createStructure