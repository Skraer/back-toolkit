const { execSync } = require('child_process')
const devPackages = ['typescript']
const packages = ['dotenv', 'express']

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