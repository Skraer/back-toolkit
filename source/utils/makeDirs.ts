import { makeDir } from './makeDir'

export const makeDirs = (dirs: string[]) => {
  dirs.forEach((dir) => {
    makeDir(dir)
  })
}
