#!/usr/bin/env node

import args from '../argparser/argparser'
import {
  generate,
  generate3rdPartyModule,
  generateAuthModule,
  generateErrorHandlerModule,
  generateMongoModule,
} from '../generator'
import {
  addScripts,
  getInstalledPackages,
  gitInit,
  initFiles,
  installAuthDeps,
  installDeps,
  installMongoDeps,
} from '../initializer'
import { makeDirs } from '../utils/makeDirs'

if (args.init) {
  installDeps(true)
  installDeps()
  initFiles()
  generateErrorHandlerModule()
  addScripts()
}

if (args.test) {
  console.log('some test command')
}

if (args.mdir.length) {
  makeDirs(args.mdir)
}

if (args.modules.includes('mongo')) {
  installMongoDeps()
  generateMongoModule()
  console.log('Mongo module was generated')
}

if (args.modules.includes('3rdparty')) {
  generate3rdPartyModule()
  console.log('3rd party request module was generated')
}

if (args.modules.includes('auth')) {
  installAuthDeps()
  installAuthDeps(true)
  generateAuthModule()
}

if (Object.keys(args.gen).length) {
  generate()
}

if (args.checkPkg) {
  const packages = getInstalledPackages()
  console.log('INSTALLED PACKAGES: ', packages)
}

if (args.init) {
  gitInit()
}

process.exit()
