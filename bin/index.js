#!/usr/bin/env node

const { installDeps } = require('../commands/installing')
const { makeDir } = require('../commands/utils/dirMethods')
const { copyFile } = require('../commands/utils/copyFile')
const { addScripts } = require('../commands/addScripts')

const rawArgs = process.argv.slice(2)

if (rawArgs.includes('init')) {
  installDeps(true)
  installDeps()
  copyFile('/src/root/tsconfig.json', '/tsconfig.json')
  copyFile('/src/root/nodemon.json', '/nodemon.json')
  copyFile('/src/config.ts')
  copyFile('/src/router.ts')
  copyFile('/src/index.ts')
  copyFile('/src/controllers/interface.ts')
} else if (rawArgs.includes('test')) {
  console.log('test');
} else if (rawArgs.includes('mdir')) {
  const dirName = rawArgs[rawArgs.findIndex((el) => el === 'mdir') + 1]
  makeDir(dirName)
} else if (rawArgs.includes('add-scripts')) {
  addScripts()
}

process.exit()