export type GenType = 's' | 'c' | 'm' | 'mw'
export type ModuleType = '3rdparty' | 'mock'
export type ArgFlagType = 'mongo' | 'auth' | 'guard'

export const isGenValid = (elem: string): boolean => ['s', 'c', 'm', 'mw'].includes(elem)
export const isModuleValid = (elem: string): boolean => ['3rdparty', 'mock'].includes(elem)

export type ArgsType = {
  init: boolean
  secret: boolean
  gen: {
    [key: string]: GenType[]
  }
  modules: ModuleType[]
  test: boolean
  mdir: string[]
  checkPkg: boolean
  vars: {
    appDir: string | undefined
  }
  flags: {
    [key in ArgFlagType]: boolean
  }
}

export interface IArgsParser {
  init: boolean
  secret: boolean
  gen: {
    [key: string]: GenType[]
  }
  modules: ModuleType[]
  test: boolean
  mdir: string[]
  checkPkg: boolean
  appDir?: string
  flags: {
    [key in ArgFlagType]: boolean
  }
}
