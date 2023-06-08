import {
  ArgFlagType,
  ArgsType,
  GenType,
  IArgsParser,
  ModuleType,
  isGenValid,
  isModuleValid,
} from './'

export class ArgsParser implements IArgsParser {
  private _gen: ArgsType['gen'] = {}
  public get gen() {
    return this._gen
  }
  private _mdir: ArgsType['mdir'] = []
  public get mdir() {
    return this._mdir
  }
  private _modules: ArgsType['modules'] = []
  public get modules() {
    return this._modules
  }
  private _checkPkg: ArgsType['checkPkg'] = false
  public get checkPkg() {
    return this._checkPkg
  }
  private _init: ArgsType['init'] = false
  public get init() {
    return this._init
  }
  private _test: ArgsType['test'] = false
  public get test() {
    return this._test
  }
  private _vars: ArgsType['vars'] = {
    appDir: undefined,
  }
  public get vars() {
    return this._vars
  }
  private _flags: ArgsType['flags'] = {
    mongo: false,
    auth: false,
    guard: false,
  }
  public get flags() {
    return this._flags
  }

  private readonly _rawSource: string[]
  public get rawSource() {
    return this._rawSource
  }

  private _raw: string[]

  constructor(rawArgs: string[]) {
    this._rawSource = rawArgs
    this._raw = rawArgs
  }

  public parseMdirs() {
    return this._wrap((raw) => {
      if (raw.includes('mdir')) {
        raw = raw.reduce((currArgs, arg, idx, arr) => {
          const prevArg = arr[idx - 1]
          const nextArg = arr[idx + 1]

          if (arg === 'mdir') this._mdir.push(nextArg)
          if (prevArg && prevArg === 'mdir') {
            return [...currArgs.slice(0, idx - 1), ...currArgs.slice(idx + 1)]
          }
          return [...currArgs, arg]
        }, [] as string[])
      }
      return raw
    })
  }

  public parseGen() {
    return this._wrap((raw) => {
      if (raw.find((arg) => arg.startsWith('gen:'))) {
        raw = raw.reduce((currArgs, arg, idx, arr) => {
          const prevArg = arr[idx - 1]
          const nextArg = arr[idx + 1]

          if (arg.startsWith('gen:')) {
            const elems = arg.replace('gen:', '').split(':') as GenType[]
            this._gen[nextArg] = [...new Set(elems.filter((el) => isGenValid(el)))]
          }

          if (prevArg && prevArg.startsWith('gen:')) {
            return [...currArgs.slice(0, idx - 1), ...currArgs.slice(idx + 1)]
          }
          return [...currArgs, arg]
        }, [] as string[])
      }
      return raw
    })
  }

  public parseModules() {
    return this._wrap((raw) => {
      if (raw.find((arg) => arg.startsWith('modules:'))) {
        const modulesSet = new Set<ModuleType>([])

        raw = raw.reduce((currArgs, arg, idx) => {
          if (arg.startsWith('modules:')) {
            const elems = arg.replace('modules:', '').split(':') as ModuleType[]
            elems.filter((el) => isModuleValid(el)).forEach((m) => modulesSet.add(m))
            return [...currArgs.slice(0, idx), ...currArgs.slice(idx + 1)]
          }
          return [...currArgs, arg]
        }, [] as string[])

        this._modules = [...modulesSet]
        if (modulesSet.has('auth')) raw = this._forceAddFlag(raw, 'auth')
      }
      return raw
    })
  }

  public parseInit() {
    return this._wrap((raw) => {
      if (raw.includes('init')) {
        this._init = true
        raw = raw.filter((arg) => arg !== 'init')
      }
      return raw
    })
  }

  public parseTest() {
    return this._wrap((raw) => {
      if (raw.includes('test')) {
        this._test = true
        raw = raw.filter((arg) => arg !== 'test')
      }
      return raw
    })
  }

  public parseCheckPkg() {
    return this._wrap((raw) => {
      if (raw.includes('checkpkg') || raw.includes('check-pkg')) {
        this._checkPkg = true
        raw = raw.filter((arg) => arg !== 'checkpkg' && arg !== 'check-pkg')
      }
      return raw
    })
  }

  public parseVars() {
    return this._wrap((raw) => {
      const varNames = Object.keys(this._vars) as (keyof ArgsType['vars'])[]
      varNames.forEach((varName) => {
        const lower = varName.toLowerCase()
        const foundArg = raw.find((arg) => arg.startsWith(`${lower}=`))

        if (foundArg) {
          const value = foundArg.split('=')[1]
          this._vars[varName] = value || undefined
          raw = raw.filter((arg) => !arg.startsWith(`${lower}=`))
        }
      })
      return raw
    })
  }

  public parseFlags() {
    return this._wrap((raw) => {
      const flags = Object.keys(this._flags) as (keyof ArgsType['flags'])[]
      flags.forEach((flag) => {
        if (raw.includes(`-${flag}`)) {
          this._flags[flag] = true
          raw = raw.filter((arg) => arg !== `-${flag}`)
        }
      })
      return raw
    })
  }

  private _wrap(callback: (raw: string[]) => string[]) {
    let raw = this._raw
    this._raw = callback(raw)
    return this
  }

  private _forceAddFlag(raw: string[], flag: ArgFlagType) {
    this._flags[flag] = true
    return raw.filter((f) => f !== `-${flag}`)
  }
}
