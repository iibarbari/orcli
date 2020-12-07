const { expect } = require('chai');
const math = require('mathjs');
const mocha = require('mocha');
const absorbingState = require('../scripts/absorbingState');

const { describe, it } = mocha;

describe('Test absorbing state', () => {
  it('it works', () => {
    const matrix = [
      [0.3, 0.6, 0.1],
      [0.1, 0.2, 0.7],
      [0, 0, 1],
    ];

    const result = absorbingState(matrix);

    if (result.name === '(I-N)^-1') {
      expect(result.value).to.deep.equal(
        math.matrix([
          [1.6, 1.2],
          [0.2, 1.4],
        ])
      );
    } else if (result.name === '((I-N)^-1)*I ') {
      expect(result.value).to.deep.equal(math.matrix([2.8, 1.6]));
      result.value = math.matrix();
    } else if (result.name === '((I-N)^-1)*A ') {
      expect(result.value).to.deep.equal(math.matrix([[1], [1]]));
    }
  });
});
