const { simplify, parse, transpose, ...math } = require('mathjs');
const chalk = require('chalk');
const log = console.log;
const _ = require('lodash');

function steadyState(matrix) {
  log(
    chalk.red.dim(
      '\nIt is your responsibility that the data you provided satisfies the conditions of an ergodic Markov Chain'
    )
  );

  const steadyStates = [matrix.flat, []];

  let transition = 1;
  let loop = 0;

  while (!_.isEqual(steadyStates[0], steadyStates[1])) {
    steadyStates.push(
      math
        .pow(matrix, transition)
        .map((e) => math.round(e, 5))
        .flat()
    );

    transition += 1;

    if (steadyStates.length === 3) {
      steadyStates.shift();
    }

    loop = loop + 1;

    if (loop > 2000) {
      throw new Error(
        "Your matrix doesn't satisfy the conditions of an ergodic Markov Chain"
      );
    }
  }

  const parsedArraySize = math.sqrt(steadyStates[0].length);
  let parsedArray = [];

  for (let index = 0; index < parsedArraySize; index += 1) {
    parsedArray.push(
      steadyStates[0].slice(
        index * parsedArraySize,
        (index + 1) * parsedArraySize
      )
    );
  }

  parsedArray = transpose(parsedArray[0]);

  log(chalk.bold('\nSteady state matrix:\n'));

  parsedArray.forEach((r) => log(chalk.bold(r)));

  return {
    index: transition - 1,
    matrix: parsedArray,
  };
}

module.exports = steadyState;
