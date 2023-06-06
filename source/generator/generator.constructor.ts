import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import {
  GenConfigType,
  TemplateType,
  generatorConfig,
  replaceConditonalPattern,
  replacePattern,
} from './generator.utils'
import paths from '../paths'
import { writeFileTo } from '../utils/writeFileTo'
import { ArgFlagType, args } from '../argparser'

type GeneratorParamsType = {
  relativePath: string
  pathTo?: string[]
  input?: string
  variables?: { [key: string]: string | number | boolean }
}

export class Generator {
  public static readonly config: GenConfigType = generatorConfig
  public variables?: { [key: string]: string | number | boolean }

  private readonly _template: TemplateType
  public get template() {
    return this._template
  }

  private readonly _relativePath: string
  public get relativePath() {
    return this._relativePath
  }

  public input?: string
  public fileName: string
  public content: string
  public pathTo: string[]

  constructor(params: GeneratorParamsType | string) {
    if (typeof params === 'string') {
      this._relativePath = params
      this.pathTo = []
    } else {
      this._relativePath = params.relativePath
      this.input = params.input
      this.variables = params.variables
      this.pathTo = params.pathTo || []
    }

    const template = this._getTemplate()
    this._template = template
    this.fileName = this.input ? replacePattern(template.fileName, this.input) : template.fileName
    this.content = template.content
  }

  private _getTemplate(): TemplateType {
    try {
      const splitted = this._relativePath.split(/\\|\//g)
      const doc = yaml.load(
        fs.readFileSync(path.join(paths.root, 'templates', ...splitted), { encoding: 'utf8' })
      ) as TemplateType
      return doc
    } catch (err: any) {
      throw new Error(`Failed parse template on path ${this._relativePath}. Error: ` + err)
    }
  }

  public writeContent() {
    return this._wrap(() => {
      if (
        !this._template.writeIf ||
        this._template.writeIf.every((flag) => args.flags[flag as ArgFlagType])
      ) {
        writeFileTo(
          path.join(paths.execRoot, paths.outputDir, ...this.pathTo, this.fileName),
          this.content
        )
      }
    })
  }

  public replaceContent(passCond = false) {
    return this._wrap(() => {
      if (!passCond) this.content = replaceConditonalPattern(this.content, args.flags)
      this.content = replacePattern(this.content, this.input || '', this.variables)
    })
  }

  private _wrap(callback: () => void) {
    callback()
    return this
  }
}
