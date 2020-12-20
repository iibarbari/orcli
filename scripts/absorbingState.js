const chalk = require('chalk');
const {
  sortedUniq,
  uniqBy,
  isEqual,
  pullAt,
  range,
  isArray,
} = require('lodash');
const math = require('mathjs');
const log = console.log;

function absorbingState(matrix) {
  const size = math.matrix(matrix).size()[0];
  let A = [];
  const N = [];
  const absorbingStates = [];

  matrix.forEach((row, i) => {
    const parseRow = sortedUniq(uniqBy(row));

    if (isEqual(parseRow, [0, 1])) {
      absorbingStates.push(i);
    }
  });

  /* calculate A */
  math.transpose(matrix).forEach((column, i) => {
    const notAbsorbingStates = range(0, size).filter(
      (i) => !absorbingStates.includes(i)
    );

    if (!notAbsorbingStates.includes(i)) {
      A.push(pullAt(column, notAbsorbingStates));
    }
  });

  // A
  A = math.transpose(A);

  /*  calculate N */
  matrix.forEach((row, i) => {
    const notAbsorbingStates = range(0, size).filter(
      (i) => !absorbingStates.includes(i)
    );

    if (notAbsorbingStates.includes(i)) {
      N.push(pullAt(row, notAbsorbingStates));
    }
  });

  const iMinusN = math.subtract(math.identity(math.size(N)[0]), N);

  const mainCalculation = math.inv(iMinusN).map((n) => math.round(n, 4));

  const transient = math
    .multiply(mainCalculation, math.ones(math.size(N)[0], 1))
    .map((n) => math.round(n, 4));

  const absorbing = math
    .multiply(mainCalculation, A)
    .map((n) => math.round(n, 4));

  const result = [
    { name: 'A', value: A },
    { name: 'N', value: N },
    { name: '(I-N)^-1', value: mainCalculation._data },
    { name: '((I-N)^-1)*I', value: transient._data },
    { name: '((I-N)^-1)*A', value: absorbing._data },
  ];

  log(chalk.blue.bold('\nAbsorbing state matrices:'));

  result.forEach(({ name, value }) => {
    log(chalk.blue.bold(`\n${name}\n`));

    value.forEach((r) => {
      if (isArray(r)) {
        log(chalk.bold(r.join('\t')));
      } else {
        log(chalk.bold(r));
      }
    });
  });

  return result;
}

module.exports = absorbingState;
