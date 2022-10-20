const rawArgs = process.argv.slice(2)

const getArgAfter = (str) => rawArgs[rawArgs.findIndex((arg) => arg === str) + 1]

exports.getArgAfter = getArgAfter