const fs = require('fs')

const makeDir = (dirPath) => {
  // const srcDir = source.toString()

  if (!fs.existsSync(path.join(dirPath))) {
    fs.mkdirSync(path.join(dirPath))
  } else {
    console.error('Same directory already exists');
  }
  // for (let dir in source) {
  //   if (dir === 'toString') continue
  //   if (!fs.existsSync(path.join(source[dir]))) {
  //     fs.mkdirSync(path.join(source[dir]))
  //   }
  // }
}

exports.makeDir = makeDir