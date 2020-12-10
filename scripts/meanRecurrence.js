const _ = require('lodash');
const chalk = require('chalk');
const math = require('mathjs');
const log = console.log;

function meanRecurrenceTime(matrix) {
  const size = math.matrix(matrix).size()[0];
  const times = [];

  for (let index = 0; index < size; index += 1) {
    // remove column and row
    let temp = matrix.filter((r, i) => i !== index);
    temp = _.zip(...temp).filter((r, i) => i !== index);
    temp = _.zip(...temp);

    // calculate (I-Nj)^-1 * 1
    const time = math.multiply(
      math.inv(math.subtract(math.identity(size - 1), temp)),
      math.ones(size - 1, 1)
    );

    // log
    times.push({
      j: index,
      time: time._data,
    });
  }

  const result = [];
  times.forEach(({ j, time }, i) => {
    const indices = _.pull(_.range(0, size), j);

    indices.forEach((k, index) => {
      const details = {
        k: k + 1,
        j: j + 1,
        time: math.round(time[index], 2),
      };

      result.push(details);

      log('\n');
      log(
        chalk.blue.bold(
          `Mean recurrence time from k=${details.k} to j=${details.j} is ${details.time}`
        )
      );
    });
  });

  return result;
}

module.exports = meanRecurrenceTime;
