const OR = require('../scripts/OR');

class DataParser {
  constructor() {}

  set({ state, matrix, transition, action }) {
    this.or = new OR({ state, matrix, transition });

    if (action === 'Calculate transition matrix') {
      this.or.logTransition;
    } else if (action === 'Calculate steady state') {
      this.or.logSteadyState;
    } else if (action === 'Calculate mean recurrence') {
      this.or.logMeanRecurrence;
    } else if (action === 'Calculate absorbing states') {
      this.or.logAbsorbingStates;
    }

    return { state, matrix, transition };
  }
}

module.exports = DataParser;
