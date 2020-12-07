const math = require('mathjs');
const { expect } = require('chai');
const mocha = require('mocha');
const transitionMatrix = require('../scripts/transition');

const { describe, it } = mocha;

const matrix = [
  [0.8, 0.2],
  [0.5, 0.5],
];

describe('Test Transition Matrix', () => {
  it('works ok', () => {
    const transition = 2;

    const expectedResult = [
      [0.74, 0.26],
      [0.65, 0.35],
    ];
    const result = transitionMatrix(matrix, transition).map((m) =>
      math.round(m, 2)
    );

    expect(result).to.deep.equal(expectedResult);
  });

  it('works ok with 1', () => {
    const transition = 1;

    const result = transitionMatrix(matrix, transition).map((m) =>
      math.round(m, 2)
    );

    expect(result).to.deep.equal(matrix);
  });

  it('gives error for strings', () => {
    const notValidValues = ['hello world'];

    notValidValues.forEach((notValid) => {
      expect(() => transitionMatrix(matrix, notValid)).to.throw(
        'Type of transition step should be a number'
      );
    });
  });

  it('gives error if transition is not an integer', () => {
    const notValidValues = [0.5, 101.7];

    notValidValues.forEach((notValid) => {
      expect(() => transitionMatrix(matrix, notValid)).to.throw(
        'Transition step should be an integer.'
      );
    });
  });

  it('gives error if transition is not between 1 to 100', () => {
    const notValidValues = [-1, 101];

    notValidValues.forEach((notValid) => {
      expect(() => transitionMatrix(matrix, notValid)).to.throw(
        'Transition step should be between 1 to 100'
      );
    });
  });
});
