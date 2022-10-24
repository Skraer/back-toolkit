const config = require('./config')

const replaceTemplate = (template, input) => {
  console.log(template);
  const filter = template.split(config.separator)[1][0]
  switch (filter) {
    case config.lowerCase:
      return input.toLowerCase()
    case config.upperCase:
      return input.toUpperCase()
    case config.titleCase:
      return input[0].toUpperCase() + input.substr(1).toLowerCase()
    default:
      return input
  }
}

exports.replaceTemplate = replaceTemplate
exports.config = config