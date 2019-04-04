const { Schema, model } = require('mongoose');

const jokeSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  joke: String,
});

module.exports.Joke = model('Joke', jokeSchema);
module.exports.jokeSchema = jokeSchema;
