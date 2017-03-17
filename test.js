/**
 * Created by WisdomKwan on 17/3/17.
 */

'use strict';

const randomize = require('randomatic');

console.log('\r');
for (let i=0; i<5; i++) {
  const prefix = i == 0 ? 'randomize: ' : '           ';
  const result = prefix + randomize('0Aa', 16);
  console.log(result);
}
console.log('\r');
