const config = {
  pattern: '@@TEMPLATE@@',
  patternRegExp: /@@TEMPLATE(\|[TLU])?@@/g,
  separator: '|',
  titleCase: 'T',
  upperCase: 'U',
  lowerCase: 'L',
  // camelCase: 'C',
  // kebabCase: 'K'
  patternBlockRegExp: /@@>>@@([\s\S]*?)@@<<@@/gm,
  patternBlockMongoRegExp: /@@\|arg=-mongo\|?>>@@([\s\S]*?)@@<<@@/gm,
}

module.exports = config