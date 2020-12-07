const { validateState, validateTransition } = require('./validators');

const statePrompt = [
  {
    type: 'input',
    name: 'state',
    message: 'Enter number of states'.green,
    validate: validateState,
  },
];

const matrixPrompt = [
  {
    type: 'input',
    name: 'matrix',
  },
];

const transitionPrompt = [
  {
    type: 'input',
    name: 'transition',
    message: 'Enter transition step'.green,
    validate: validateTransition,
  },
];

module.exports = { matrixPrompt, statePrompt, transitionPrompt };
