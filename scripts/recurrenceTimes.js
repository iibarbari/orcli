const _ = require('lodash');
const chalk = require('chalk');
const math = require('mathjs');
const log = console.log;
const steadyState = require('./steadyState');

function recurrenceTimes(matrix) {
  const ss = steadyState(matrix).matrix;

  log(chalk.bold('\nRecurrence Times:\n'));

  ss.forEach((r) => log(chalk.bold(math.round(1 / r, 4))));
}

module.exports = recurrenceTimes;
