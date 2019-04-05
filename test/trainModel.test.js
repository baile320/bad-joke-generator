const trainModel = require('../src/utils/trainModel');

it('normalizeModelWeights should appropriately normalize weights', () => {
  const weights = {
    word: {
      a: 1, b: 2, c: 2,
    },
  };

  expect(trainModel.normalizeModelWeights(weights)).toEqual({ word: { a: 0.2, b: 0.4, c: 0.4 } });
});
