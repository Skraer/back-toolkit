#!/usr/bin/env node

import args from '../argparser/argparser'
import {
  generate,
  generate3rdPartyModule,
  generateErrorHandlerModule,
  generateMongoModule,
} from '../generator'
import {
  addScripts,
  getInstalledPackages,
  initFiles,
  installDeps,
  installMongoDeps,
} from '../initializer'
import { makeDirs } from '../utils/makeDirs'

if (args.init) {
  installDeps(true)
  installDeps()
  initFiles()
  addScripts()
}

if (args.test) {
  console.log('some test command')
}

if (args.mdir.length) {
  makeDirs(args.mdir)
}

if (Object.keys(args.gen).length) {
  generate()
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

if (args.modules.includes('errh')) {
  generateErrorHandlerModule()
  console.log('Error handler module was generated')
}

if (args.checkPkg) {
  const packages = getInstalledPackages()
  console.log('INSTALLED PACKAGES: ', packages)
}

process.exit()
