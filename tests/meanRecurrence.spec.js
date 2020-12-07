const { expect } = require('chai');
const math = require('mathjs');
const mocha = require('mocha');
const meanRecurrenceTime = require('../scripts/meanRecurrence');

const { describe, it } = mocha;

describe('Test absorbing state', () => {
  it('it works', () => {
    const matrix = [
      [0.3, 0.6, 0.1],
      [0.1, 0.2, 0.7],
      [0, 0, 1],
    ];

    const result = meanRecurrenceTime(matrix);
  });
});
