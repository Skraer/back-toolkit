import fs from 'fs'
import path from 'path'

const paths = {
  root: __dirname,
  execRoot: process.cwd(),
  outputDir: 'src',
}

// ;['src', 'app', 'source'].forEach((dir) => {
//   if (fs.existsSync(path.join(paths.execRoot, dir))) paths.outputDir = dir
// })

export default paths
