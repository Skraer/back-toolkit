const fs = require('fs')
const path = require('path')

const makeDir = (dirPath) => {
  console.log(dirPath);
  const dirs = dirPath.split(/[\/\\]/g)
  console.log(dirs);

  const createDir = (dirName) => {
    if (!fs.existsSync(path.join(dirName))) {
      fs.mkdirSync(path.join(dirName))
    }
  }

  if (dirs.length === 1) {
    createDir(dirs[0])
  } else if (dirs.length > 1) {
    for (let idx = 0; idx < dirs.length; idx++) {
      // const dir = dirs[idx];
      createDir(path.join(...dirs.slice(0, idx + 1)))
    }
  } else {
    console.error('Directory was not set');
  }

  // for (let dir in source) {
  //   if (dir === 'toString') continue
  //   if (!fs.existsSync(path.join(source[dir]))) {
  //     fs.mkdirSync(path.join(source[dir]))
  //   }
  // }
}

exports.makeDir = makeDir