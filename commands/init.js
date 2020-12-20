const inquirer = require('inquirer');
const { rainbow, random, ...colors } = require('colors');
const sum = require('lodash/sum');
const math = require('mathjs');
const DataParser = require('../lib/DataParser');
const {
  matrixPrompt,
  statePrompt,
  transitionPrompt,
} = require('../utils/prompts');

const init = {
  async set() {
    const self = {};

    self.dataManager = new DataParser();
    self.state = undefined;
    self.matrix = undefined;
    self.action = undefined;
    self.transition = 1;

    self.init = async () => {
      await self.promptState();
      await self.promptMatrix();
      await self.promptTransition();
      await self.promptAction();

      await self.dataManager.set({
        state: self.state,
        matrix: self.matrix,
        transition: self.transition,
        action: self.action,
      });
    };

    self.promptState = async () => {
      const input = await inquirer.prompt(statePrompt);

      if (input.state) {
        self.state = Number(input.state);
        console.log(`Number of transitions set to`.blue, `${self.state}`.cyan);
      }
    };

    self.promptMatrix = async () => {
      const matrix = [];

      for (let i = 0; i < self.state; i++) {
        const input = await inquirer.prompt([
          {
            ...matrixPrompt[0],
            message: `Enter row ${i + 1} with spaces`.green,
            validate: async (input) => {
              const row = input.split(' ');

              if (row.length !== self.state) {
                throw new Error(
                  `Please enter ${self.state} values for a row.`.red
                );
              } else if (row.some((a) => a < 0 || a > 1)) {
                throw new Error(`Each element should be between 0 to 1`.red);
              } else if (sum(math.multiply(row, 10)) > 10) {
                console.log({ row, sum: sum(math.multiply(row, 10)) });
                throw new Error(
                  `Sum of each row should be equal to 1 or less`.red
                );
              }

              return true;
            },
          },
        ]);

        matrix.push(input.matrix.split(' ').map((el) => Number(el)));
      }

      self.matrix = matrix;

      console.group();
      console.log('Your matrix is:'.blue);
      self.matrix.forEach((r) => console.log(r.join('\t').cyan));
      console.groupEnd();
    };

    self.promptTransition = async () => {
      const input = await inquirer.prompt(transitionPrompt);

      if (input.transition) {
        self.transition = input.transition;
        console.log(
          `Transition step is set to`.blue,
          `${input.transition}`.cyan
        );
      }
    };

    self.promptAction = async () => {
      const input = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          choices: [
            'Calculate transition matrix',
            'Calculate absorbing states',
            'Calculate steady state',
            'Calculate recurrence times',
          ],
        },
      ]);

      input.action && (self.action = input.action);
    };

    self.init();
  },
};

module.exports = init;
