import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import paths from '../paths'

import { GenType, ModuleType } from '../argparser'

export type MessageType = {
  content: string
}

const getTemplate = (fileName: string) => {
  const filePath = path.join(paths.root, 'consoleMessages', `${fileName}.yaml`)
  try {
    const doc = yaml.load(fs.readFileSync(filePath, { encoding: 'utf8' })) as MessageType
    return doc
  } catch (err) {
    throw new Error(`Failed parse message template on path ${filePath}. Error: ` + err)
  }
}

export const logAfterMessage = (
  action: 'modules' | 'gen' | 'init',
  name?: ModuleType | GenType
) => {
  const fileName = `after.${action}.${name || ''}`
  const template = getTemplate(fileName)
  console.log(template.content)
}
