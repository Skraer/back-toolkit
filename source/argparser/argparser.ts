// const rawArgs = process.argv.slice(2)

type GenType = 's' | 'c' | 'm' | 'mw'
type ModuleType = '3rdparty' | 'mongo'
export type ArgFlagType = 'mongo'

const isGenValid = (elem: string): boolean => ['s', 'c', 'm', 'mw'].includes(elem)
const isModuleValid = (elem: string): boolean => ['3rdparty', 'mongo'].includes(elem)

export type ArgsType = {
  init: boolean
  gen: {
    [key: string]: GenType[]
  }
  modules: ModuleType[]
  test: boolean
  mdir: string[]
  checkPkg: boolean
  flags: {
    [key in ArgFlagType]: boolean
  }
}

const parseRawArgs = (rawArgs: string[]): ArgsType => {
  const obj: ArgsType = {
    gen: {},
    mdir: [],
    modules: [],
    checkPkg: false,
    init: false,
    test: false,
    flags: {
      mongo: false,
    },
  }

  if (rawArgs.includes('mdir')) {
    rawArgs = rawArgs.reduce((currArgs, arg, idx, arr) => {
      const prevArg = arr[idx - 1]
      const nextArg = arr[idx + 1]

      if (arg === 'mdir') obj.mdir.push(nextArg)
      if (prevArg && prevArg === 'mdir') return currArgs.slice(idx - 1, idx + 1)
      return [...currArgs, arg]
    }, [] as string[])
  }

  if (rawArgs.find((arg) => arg.startsWith('gen:'))) {
    rawArgs = rawArgs.reduce((currArgs, arg, idx, arr) => {
      const prevArg = arr[idx - 1]
      const nextArg = arr[idx + 1]

      if (arg.startsWith('gen:')) {
        const elems = arg.replace('gen:', '').split(':') as GenType[]
        obj.gen[nextArg] = [...new Set(elems.filter((el) => isGenValid(el)))]
      }

      if (prevArg && prevArg.startsWith('gen:')) return currArgs.slice(idx - 1, idx + 1)
      return [...currArgs, arg]
    }, [] as string[])
  }

  if (rawArgs.find((arg) => arg.startsWith('modules:'))) {
    const modulesSet = new Set<ModuleType>([])

    rawArgs = rawArgs.reduce((currArgs, arg, idx) => {
      if (arg.startsWith('modules:')) {
        const elems = arg.replace('modules:', '').split(':') as ModuleType[]
        elems.filter((el) => isModuleValid(el)).forEach((m) => modulesSet.add(m))
        return currArgs.slice(idx, idx + 1)
      }
      return [...currArgs, arg]
    }, [] as string[])

    obj.modules = [...modulesSet]
  }

  if (rawArgs.includes('init')) {
    obj.init = true
    rawArgs = rawArgs.filter((arg) => arg !== 'init')
  }

  if (rawArgs.includes('test')) {
    obj.test = true
    rawArgs = rawArgs.filter((arg) => arg !== 'test')
  }

  if (rawArgs.includes('checkpkg') || rawArgs.includes('check-pkg')) {
    obj.checkPkg = true
    rawArgs = rawArgs.filter((arg) => arg !== 'checkpkg' && arg !== 'check-pkg')
  }

  if (rawArgs.includes('-mongo')) {
    obj.flags.mongo = true
  }

  return obj
}

const args = parseRawArgs(process.argv.slice(2))

export default args
