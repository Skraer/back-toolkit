#!/usr/bin/env node

const { exec } = require('node:child_process')
const { copyConfigs } = require('../commands/configs')

const rawArgs = process.argv.slice(2)

if (rawArgs.includes('init')) {
  copyConfigs()
  exec('npm i dotenv express')
} else {

}

process.exit()