import { execSync } from 'child_process'
const devPackages = [
  'typescript',
  '@types/express',
  '@types/node',
  '@types/cors',
  'nodemon',
  'ts-node',
]
const packages = ['dotenv', 'express', 'cors', 'nanoid']
const mongoPackages = ['mongodb']

export const getInstalledPackages = () => {
  const result = execSync('npm ls --json').toString()
  const arr = result ? Object.keys(JSON.parse(result)?.dependencies) : []

  return arr
}

export const installDeps = (dev = false) => {
  execSync(
    `npm i ${dev ? '--save-dev ' + devPackages.join(' ') : packages.join(' ')}`,
    // @ts-ignore: Unreachable code error
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
    }
  )
}

export const installMongoDeps = (module?: string) => {
  // @ts-ignore: Unreachable code error
  execSync(`npm i ${mongoPackages.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })
}
