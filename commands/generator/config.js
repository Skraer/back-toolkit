module.exports = {
  pattern: /(\/\*\s*|@)TEMPLATE\|?[TLU]?(\s*\*\/|@)/gm,
  patternBlock: /\/\*\s*TEMPLATE_BLOCK\[(.*)\]>>\s*([\s\S]*?)\s*\*\//gm,
  patternStr: ['/* TEMPLATE */', '@TEMPLATE@'],
  patternBlockStr: '/* TEMPLATE_BLOCK[-arg]>>  */',
  separator: '|',
  titleCase: 'T',
  upperCase: 'U',
  lowerCase: 'L',
}
