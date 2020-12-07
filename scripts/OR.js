const absorbingState = require('./absorbingState');
const transition = require('./transition');
const steadyState = require('./steadyState');
const meanRecurrence = require('./meanRecurrence');

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

  get logMeanRecurrence() {
    return meanRecurrence(this.matrix);
  }

  get logAbsorbingStates() {
    return absorbingState(this.matrix);
  }
}

module.exports = OR;
