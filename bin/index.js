#!/usr/bin/env node

const { installDeps } = require('../commands/installing')
const { makeDir } = require('../commands/utils/dirMethods')
const { copyFile } = require('../commands/utils/copyFile')
const { addScripts } = require('../commands/addScripts')
const { config } = require('../commands/generator/config')
const generate = require('../commands/generator')

// const getArgAfter = (str) => rawArgs[rawArgs.findIndex((arg) => arg === str)]

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
  addScripts()
} else if (rawArgs.includes('test')) {
  console.log(config);
} else if (rawArgs.includes('mdir')) {
  const dirName = rawArgs[rawArgs.findIndex((el) => el === 'mdir') + 1]
  makeDir(dirName)
} else if (rawArgs.find(arg => arg.startsWith('gen'))) {
  generate()
} else if (rawArgs.includes('check-pkg')) {
  const packages = getInstalledPackages()
  console.log('PACKAGES', packages)
}

process.exit()