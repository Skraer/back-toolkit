const config = {
  pattern: '@@TEMPLATE@@',
  patternRegExp: /@@TEMPLATE(\|[TLU])?@@/g,
  separator: '|',
  titleCase: 'T',
  upperCase: 'U',
  lowerCase: 'L',
  // camelCase: 'C',
  // kebabCase: 'K'
}

module.exports = config