const fs = require('fs')
const path = require('path')
// const rawData = require('../source/tsconfig.json')
// const { source } = require('./paths')
// const rawData = fs.readFileSync(path.join('..', 'source', 'tsconfig.json'))
// const config = require('../source/tsconfig.json')
// const rawData = fs.readFileSync(config)

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

  // const outputRoot = path.join(process.cwd())
  // fs.writeFileSync(outputRoot, rawData)
  console.log('cwd', process.cwd());
  console.log('dirname', __dirname);
  console.log('filename', __filename);
  // console.log('execPath', process.execPath);
}
// createStructure()
// createTsConfig()
exports.createTsConfig = createTsConfig
