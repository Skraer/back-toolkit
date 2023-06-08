import fs from 'fs'
import path from 'path'

import { execSync } from 'child_process'
import {
  authDevPackages,
  authPackages,
  devPackages,
  mongoPackages,
  packages,
} from './initializer.utils'
import paths from '../paths'
import { Generator, generateConfig } from '../generator'

export const installDeps = (isDev = false) => {
  try {
    execSync(`npm i ${isDev ? '--save-dev ' + devPackages.join(' ') : packages.join(' ')}`)
    console.log(`Success installed ${isDev ? 'dev' : ''} dependencies`)
  } catch (err) {
    console.error(`exec error: ${err}`)
  }
}

export const getInstalledPackages = () => {
  try {
    const result = execSync('npm ls --json').toString()
    const arr = result ? Object.keys(JSON.parse(result)?.dependencies) : []
    return arr
  } catch (err) {
    console.error(`exec error: ${err}`)
  }
}

export const installMongoDeps = () => {
  try {
    execSync(`npm i ${mongoPackages.join(' ')}`)
    console.log('Success installed mongo dependencies')
  } catch (err) {
    console.error(`exec error: ${err}`)
  }
}

export const gitInit = () => {
  try {
    execSync('git init')
    console.log('Git init success')
  } catch (err) {
    console.error(`exec error: ${err}`)
  }
}

export const installAuthDeps = (isDev = false) => {
  try {
    execSync(`npm i ${isDev ? '--save-dev ' + authDevPackages.join(' ') : authPackages.join(' ')}`)
    console.log(`Success installed auth ${isDev ? 'dev' : ''} dependencies`)
  } catch (err) {
    console.error(`exec error: ${err}`)
  }
}

export const addScripts = () => {
  const rawData = fs.readFileSync(path.join(process.cwd(), '/package.json')).toString()
  const jsonData = JSON.parse(rawData)
  const resultData = {
    ...jsonData,
    scripts: {
      ...jsonData['scripts'],
      build: 'tsc',
      launch: 'node ./dist/index.js',
      'start:test': 'tsc && node ./dist/index.js -test-db',
      start: 'tsc && node ./dist/index.js -prod-db',
      dev: `nodemon --config nodemon.json ./${paths.outputDir}/index.ts -test-db`,
    },
  }
  const buffer = Buffer.from(JSON.stringify(resultData, undefined, 2))
  fs.writeFileSync(path.join(process.cwd(), '/package.json'), buffer)
}

export const initFiles = () => {
  new Generator('tsconfig.yaml').writeContent(true)
  new Generator('nodemon.yaml').writeContent(true)
  new Generator('gitignore.yaml').writeContent(true)
  new Generator('prettierignore.yaml').writeContent(true)
  new Generator('router.yaml').writeContent()
  new Generator('index.yaml').writeContent()
  new Generator({
    relativePath: 'controllers/interface.yaml',
    pathTo: ['controllers'],
  })
    .replaceContent()
    .writeContent()
  generateConfig()
}
