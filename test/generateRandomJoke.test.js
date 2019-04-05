const generateRandomJoke = require('../src/utils/generateRandomJoke');

it('generateRandomJoke should return a non-empty string ', () => {
  const joke = generateRandomJoke();
  expect(joke.length).toBeGreaterThan(0);
  expect(typeof joke).toBe('string');
});
