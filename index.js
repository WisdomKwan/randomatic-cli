/**
 * Created by WisdomKwan on 17/3/17.
 */

'use strict';

const program = require('commander');
const randomize = require('randomatic');
const version = require('./package').version;

const paramsDefault = {
  pattern: '0Aa',
  length: 8,
  count: 1,
  options: {
    chars: undefined
  },
};

/**
 * generate random string with command args.
 * @param {Object} params
 * @return {String}
 */
const doCmd = function (params) {
  if (params.pattern === '?') {
    return randomize('?', params.length, params.options);
  }
  return randomize(params.pattern, params.length);
};

/**
 * # randomatic cmd:
 *  randomatic -p aA0 -l 16
 *
 * ## pattern
 *  a: lowercase alpha characters ('abcdefghijklmnopqrstuvwxyz').
 *  A: uppercase alpha characters ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').
 *  0: numeric characters ('0123456789').
 *  !: special characters ('~!@#$%^&()_+-={}[];\',.').
 *  *: all characters (all of the above combined).
 *  ?: custom characters (pass a string of custom characters to the options).
 *
 * ## length
 *  the length of the string to generate.
 *  examples:
 *    randomize('A', 5) will generate 5-character, uppercase string.
 *    randomize('AAAA') will generate 4-characters, uppercase string.
 *
 * ## chars
 *  define a custom string to be randomized.
 *  example:
 *    randomize('?', 20, {chars: 'qwertyuio'})
 */
program
  .version(`randomatic-cli ${version}`)
  .option('-p, --pattern [pattern]', 'the pattern to use for randomizing, [a], [A], [0], [!], [*], [?], default: [0Aa]')
  .option('-l, --length [length]', 'the length of the string to generate.', Number.parseInt)
  .option('-c, --count [count]', 'randomize count.', Number.parseInt)
  .option('-C, --chars [chars]', 'define a custom string to be randomized.')
  .parse(process.argv);

let params = paramsDefault;
if (program.pattern) {
  params = Object.assign(params, { pattern: program.pattern });
}
if (program.length) {
  params = Object.assign(params, { length: program.length});
}
if (program.count) {
  params = Object.assign(params, { count: program.count });
}
if (program.chars) {
  params = Object.assign(params, { options: { chars: program.chars } });
}

// exec randomize function
console.log('\r');
for (let i=0; i<params.count; i++) {
  const prefix = i == 0 ? 'randomize: ' : '           ';
  const result = prefix + doCmd(params);
  console.log(result);
}
console.log('\r');