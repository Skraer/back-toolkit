import fs from 'fs'
import path from 'path'

export const createDir = (dirName: string) => {
  if (!fs.existsSync(path.join(dirName))) {
    fs.mkdirSync(path.join(dirName))
  }
}

export const makeDir = (dirPath: string) => {
  const dirs = dirPath.split(/[\/\\]/g)

  if (dirs.length === 1) {
    createDir(dirs[0])
  } else if (dirs.length > 1) {
    for (let idx = 0; idx < dirs.length; idx++) {
      createDir(path.join(...dirs.slice(0, idx + 1)))
    }
  } else {
    console.error('Directory was not set')
  }
}
