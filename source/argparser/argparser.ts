import { ArgsParser } from './argsparser.constructor'

export const args = new ArgsParser(process.argv.slice(2))
  .parseMdirs()
  .parseGen()
  .parseModules()
  .parseInit()
  .parseSecret()
  .parseTest()
  .parseCheckPkg()
  .parseVars()
  .parseFlags()

export default args
