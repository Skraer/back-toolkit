#!/usr/bin/env node

const { execSync } = require('child_process')
const { copyConfigs } = require('../commands/configs')

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
}

process.exit()