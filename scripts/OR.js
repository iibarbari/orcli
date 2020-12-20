const absorbingState = require('./absorbingState');
const transition = require('./transition');
const steadyState = require('./steadyState');
const recurrenceTimes = require('./recurrenceTimes');

class OR {
  constructor({ state, matrix, transition }) {
    this.state = state;
    this.matrix = matrix;
    this.transition = transition;
  }

  get logTransition() {
    return transition(this.matrix, this.transition);
  }

  get logSteadyState() {
    return steadyState(this.matrix);
  }

  get logRecurrenceTimes() {
    return recurrenceTimes(this.matrix);
  }

  get logAbsorbingStates() {
    return absorbingState(this.matrix);
  }
}

module.exports = OR;

// const result = new OR({
//   state: 6,
//   // matrix: [
//   //   [0.4, 0.3, 0.1, 0.1, 0.05, 0.05],
//   //   [0.25, 0.25, 0.25, 0.1, 0.05, 0.1],
//   //   [0, 0, 1, 0, 0, 0],
//   //   [0.1, 0.2, 0.1, 0.3, 0.1, 0.2],
//   //   [0, 0, 0, 0, 1, 0],
//   //   [0.05, 0.1, 0.1, 0.15, 0.25, 0.35],
//   // ],
//   // matrix: [
//   //   [0.4, 0.3, 0.1, 0.1, 0.1],
//   //   [0.25, 0.25, 0.25, 0.25, 0],
//   //   [0.1, 0.2, 0.3, 0.3, 0.1],
//   //   [0.05, 0.1, 0.1, 0.05, 0.7],
//   //   [0.2, 0.2, 0.2, 0.2, 0.2],
//   // ],
//   // matrix: [
//   //   [0.3, 0.6, 0.1],
//   //   [0.1, 0.6, 0.3],
//   //   [0.05, 0.4, 0.55],
//   // ],
//   // matrix: [
//   //   [0.2, 0.3, 0.5],
//   //   [0.4, 0.1, 0.5],
//   //   [1, 0, 0],
//   // ],
//   transition: 3,
// }).logRecurrenceTimes;
