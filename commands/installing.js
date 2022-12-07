const { execSync } = require('child_process')
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

const getInstalledPackages = () => {
  const result = execSync('npm ls --json')
  const arr = result ? Object.keys(JSON.parse(result)?.dependencies) : []

  return arr
}

const installDeps = (dev = false) => {
  execSync(
    `npm i ${dev ? '--save-dev ' + devPackages.join(' ') : packages.join(' ')}`,
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

const installMongoDeps = (module) => {
  execSync(`npm i ${mongoPackages.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })
}

exports.installDeps = installDeps
exports.installMongoDeps = installMongoDeps
exports.getInstalledPackages = getInstalledPackages
