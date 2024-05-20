import { createLexer } from '../../syntax-parser';

export const sqlTokenizer = createLexer([
  {
    type: 'whitespace',
    regexes: [/^(\s+)/],
    ignore: true,
  },
  {
    type: 'comment',
    regexes: [
      /^((?:#|--).*?(?:\n|$))/, // # --
      /^(\/\*[^]*?(?:\*\/|$))/, // /* */
    ],
    ignore: true,
  },
  {
    type: 'number',
    regexes: [/^(\d+(\.\d+)?|0x[\dA-Fa-f]+|0b[01]+)\b/],
  },
  {
    type: 'word',
    regexes: [
      /^(\w+)/, // word
      /^(\${\w+})/, // ${word}
    ],
  },
  {
    type: 'string',
    regexes: [
      /^((?=")"[^"\\]*(?:\\[\S\s][^"\\]*)*")/, // ""
      /^((?=')'[^'\\]*(?:\\[\S\s][^'\\]*)*')/, // ''
      /^((?=`)`[^\\`]*(?:\\[\S\s][^\\`]*)*`)/, // ``
    ],
  },
  {
    type: 'special',
    regexes: [
      /^(\(|\))/, // '(' ')'.
      /^(!=|<>|==|<=|>=|!<|!>|\|\||::|->>|->|~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|.)/, // operators.
    ],
  },
]);
