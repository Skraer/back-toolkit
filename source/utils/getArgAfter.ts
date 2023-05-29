const rawArgs = process.argv.slice(2)

export const getArgAfter = (str: string) => rawArgs[rawArgs.findIndex((arg) => arg === str) + 1]
