import fs from 'fs'
import path from 'path'
import { makeDir } from './makeDir'

export const writeFileTo = (pathTo: string, content: string) => {
  makeDir(path.join(...pathTo.split(/[\/\\]/g).slice(0, -1)))
  fs.writeFileSync(path.join(pathTo), Buffer.from(content.trim()))
  return pathTo
}
