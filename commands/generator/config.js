module.exports = {
  pattern: /(\/\*\s*|@)TEMPLATE\|?[TLU]?(\s*\*\/|@)/gm,
  patternBlock: /\/\*\s*TEMPLATE_BLOCK\[(.*)\]>>\s*([\s\S]*?)\s*\*\//gm,
  // patternSwitch: /\/\*\s*TEMPLATE_SWITCH\[(.*)\]%%\*\//gm,
  patternSwitch: /\/\*\s*TEMPLATE_SWITCH([\s\S]*?)\s*\*\//gm,
  patternSwitchItem: /\[(.*)\]%([\s\S]*?)%/g,
  patternStr: ['/* TEMPLATE */', '@TEMPLATE@'],
  patternBlockStr: '/* TEMPLATE_BLOCK[-arg]>>  */',
  separator: '|',
  titleCase: 'T',
  upperCase: 'U',
  lowerCase: 'L',
}
