async function validateState(input) {
  if (
    Number.isNaN(Number(input)) ||
    Number(input) !== parseInt(input) ||
    input < 1 ||
    input > 10
  ) {
    throw new Error(`State must be an integer between 1 to 10`);
  }

  return true;
}

async function validateTransition(input) {
  if (Number.isNaN(Number(input)) && Number(input) !== parseInt(input)) {
    throw new Error(`Transition step should be an integer.`);
  } else if (input < 1 || input > 100) {
    throw new Error(`Transition step should be between 1 to 100`);
  }

  return true;
}

module.exports = { validateState, validateTransition };
