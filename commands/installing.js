const { execSync } = require('child_process')
const devPackages = ['typescript', '@types/express', '@types/node', '@types/cors', 'nodemon', 'ts-node']
const packages = ['dotenv', 'express', 'cors', 'nanoid']

const installDeps = (dev = false) => {
  execSync(`npm i ${dev
    ? '--save-dev ' + devPackages.join(' ')
    : packages.join(' ')
    }`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    })
}

exports.installDeps = installDeps