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
