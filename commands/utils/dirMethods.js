const fs = require('fs')
const path = require('path')

const createDir = (dirName) => {
  if (!fs.existsSync(path.join(dirName))) {
    fs.mkdirSync(path.join(dirName))
  }
}

const makeDir = (dirPath) => {
  const dirs = dirPath.split(/[\/\\]/g)

  if (dirs.length === 1) {
    createDir(dirs[0])
  } else if (dirs.length > 1) {
    for (let idx = 0; idx < dirs.length; idx++) {
      createDir(path.join(...dirs.slice(0, idx + 1)))
    }
  } else {
    console.error('Directory was not set');
  }
}

exports.makeDir = makeDir
exports.createDir = createDir