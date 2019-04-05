const { Schema, model } = require('mongoose');

const randomJokeSchema = new Schema({
  joke: String,
});

const RandomJoke = model('RandomJoke', randomJokeSchema);

const save = (joke) => {
  const jokeToSave = new RandomJoke(joke);
  return RandomJoke.create(jokeToSave);
};

const lookup = jokeId => RandomJoke.findById(jokeId);

module.exports.RandomJoke = RandomJoke;
module.exports.randomJokeSchema = randomJokeSchema;
module.exports.save = save;
module.exports.lookup = lookup;
