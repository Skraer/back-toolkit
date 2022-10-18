#!/usr/bin/env node

const { copyConfigs } = require('../commands/configs')
const { installDeps } = require('../commands/installing')
const { makeDir } = require('../commands/makeDir')

const rawArgs = process.argv.slice(2)

if (rawArgs.includes('init')) {
  copyConfigs()
  installDeps(true)
  installDeps()
} else if (rawArgs.includes('test')) {
  console.log('test');
} else if (rawArgs.includes('mdir')) {
  const dirName = rawArgs[rawArgs.findIndex((el) => el === 'mdir') + 1]
  makeDir(dirName)
}

process.exit()