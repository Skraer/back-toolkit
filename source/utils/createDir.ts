import fs from 'fs'
import path from 'path'

export const createDir = (dirName: string) => {
  if (!fs.existsSync(path.join(dirName))) {
    fs.mkdirSync(path.join(dirName))
  }
}
