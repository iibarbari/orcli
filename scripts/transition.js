const math = require('mathjs');
const chalk = require('chalk');
const log = console.log;

function transitionMatrix(matrix, transition = 1) {
  log(chalk.bold('\nTransition matrix\n'));

  math
    .pow(matrix, transition)
    .map((m) => math.round(m, 4))
    .forEach((r) => log(chalk.bgBlack.whiteBright.bold(r.join('\t'))));

  return math.pow(matrix, transition).map((m) => math.round(m, 4));
}

module.exports = transitionMatrix;
