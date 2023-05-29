#!/usr/bin/env node

import { installDeps, getInstalledPackages } from '../commands/installing'
import { makeDir } from '../commands/utils/dirMethods'
import { copyFile, copyDir } from '../commands/utils/copyFile'
import { addScripts } from '../commands/addScripts'
import config from '../commands/generator/config'
import generate from '../commands/generator'

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
  console.log(config)
} else if (rawArgs.includes('mdir')) {
  const dirName = rawArgs[rawArgs.findIndex((el) => el === 'mdir') + 1]
  makeDir(dirName)
} else if (rawArgs.find((arg) => arg.startsWith('gen'))) {
  generate()
} else if (rawArgs.includes('check-pkg')) {
  const packages = getInstalledPackages()
  console.log('PACKAGES', packages)
} else if (rawArgs.includes('utils')) {
  copyDir('/src/utils/')
}

process.exit()
