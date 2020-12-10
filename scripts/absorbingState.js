const chalk = require('chalk');
const { isArray } = require('lodash');
const math = require('mathjs');
const log = console.log;

function absorbingState(matrix) {
  const size = math.matrix(matrix).size()[0];
  const N = math.matrix();
  const A = math.matrix();

  /* FIXME: O-> 0 matrix I-> identity */
  matrix.forEach((row, rowIndex) => {
    if (rowIndex !== size - 1) {
      row.forEach((el, elIndex) => {
        if (elIndex !== size - 1) {
          N.subset(math.index(rowIndex, elIndex), el);
        } else {
          A.subset(math.index(rowIndex, 0), el);
        }
      });
    }
  });

  const mainCalculation = math
    .inv(math.subtract(math.identity(size - 1), N))
    .map((n) => math.round(n, 2));

  const transient = math
    .multiply(mainCalculation, math.ones(size - 1))
    .map((n) => math.round(n, 2));

  const absorbing = math
    .multiply(mainCalculation, A)
    .map((n) => math.round(n, 2));

  const result = [
    { name: '(I-N)^-1', value: mainCalculation._data },
    { name: '((I-N)^-1)*I', value: transient._data },
    { name: '((I-N)^-1)*A', value: absorbing._data },
  ];

  log(chalk.bold('\nAbsorbing state matrices:\n'));

  result.forEach(({ name, value }) => {
    log(chalk.bold(`\n${name}\n`));

    value.forEach((r) => {
      if (isArray(r)) {
        log(chalk.bgBlack.whiteBright.bold(r.join('\t')));
      } else {
        log(chalk.bgBlack.whiteBright.bold(r));
      }
    });
  });

  return result;
}

module.exports = absorbingState;
