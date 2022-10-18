#!/usr/bin/env node

const { execSync } = require('child_process')
const { copyConfigs } = require('../commands/configs')
const { makeDir } = require('../commands/makeDir')

const rawArgs = process.argv.slice(2)

if (rawArgs.includes('init')) {
  copyConfigs()
  execSync('npm i dotenv express', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  })
} else if (rawArgs.includes('test')) {
  console.log('test');
} else if (rawArgs.includes('mdir')) {
  const dirName = rawArgs[rawArgs.findIndex((el) => el === 'mdir') + 1]
  // console.log(dirName);
  makeDir(dirName)
}

process.exit()