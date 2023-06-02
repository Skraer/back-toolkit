import fs from 'fs'
import path from 'path'
import args from './argparser/argparser'

const paths = {
  root: __dirname,
  execRoot: process.cwd(),
  outputDir: args.appDir || 'src',
}

// ;['src', 'app', 'source'].forEach((dir) => {
//   if (fs.existsSync(path.join(paths.execRoot, dir))) paths.outputDir = dir
// })

export default paths
