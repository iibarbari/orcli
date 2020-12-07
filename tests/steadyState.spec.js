const { expect } = require('chai');
const mocha = require('mocha');
const steadyState = require('../scripts/steadyState');

const { describe, it } = mocha;

describe('Test steady state', () => {
  it('it works', () => {
    const matrix = [
      [0.9, 0.1],
      [0.2, 0.8],
    ];

    const result = steadyState(matrix);

    expect(result.matrix).to.deep.equal([
      [0.67, 0.33],
      [0.66, 0.34],
    ]);
    expect(result.index).to.be.equal(13);
  });
});
