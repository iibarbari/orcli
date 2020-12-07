async function validateState(input) {
  if (
    Number.isNaN(Number(input)) ||
    Number(input) !== parseInt(input) ||
    input < 2 ||
    input > 10
  ) {
    throw new Error(`State must be an integer between 2 to 10`);
  }

  return true;
}

async function validateTransition(input) {
  if (Number.isNaN(Number(input)) && Number(input) !== parseInt(input)) {
    throw new Error(`Transition step should be an integer.`);
  } else if (input < 1) {
    throw new Error(`Transition step should be 1 or greater.`);
  }

  return true;
}

module.exports = { validateState, validateTransition };
