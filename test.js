/**
 * Created by WisdomKwan on 17/3/17.
 */

'use strict';

const spawn = require('child_process').spawn;
const randomatic = spawn('./bin/randomatic', ['-l', 16, '-c', 6]);

randomatic.stdout.on('data', function (data) {
  console.log(data.toString());
});

randomatic.stderr.on('data', function (data) {
  console.log(`randomatic stderr: ${data}`);
});

randomatic.on('close', function (code) {
  if (code != 0) {
    console.log(`randomatic exit code: ${code}`);
  }
});

randomatic.on('error',  function (err) {
  console.log(`randomatic start failed!\n${err}`);
});