const fs = require('fs')
const path = require('path')

const addScripts = () => {
  const rawData = fs.readFileSync(path.join(process.cwd(), '/package.json'))
  const jsonData = JSON.parse(rawData)
  const resultData = {
    ...jsonData,
    scripts: {
      ...jsonData['scripts'],
      "build": "tsc",
      "launch": "node ./dist/index.js",
      "start:test": "tsc && node ./dist/index.js -test-db",
      "start": "tsc && node ./dist/index.js -prod-db",
      "dev": "nodemon --config nodemon.json ./src/index.ts -test-db"
    }
  }
  const buffer = Buffer.from(JSON.stringify(resultData))
  fs.writeFileSync(path.join(process.cwd(), '/package.json'), buffer)
}

exports.addScripts = addScripts