const axios = require('axios');

const db = require('../database/index');
const { Joke } = require('../database/models/Joke');

axios.defaults.headers.common.Accept = 'application/json'; // for all requests

const saveJokes = async () => {
  try {
    const res = await axios.get('http://icanhazdadjoke.com/');
    const joke = res.data;
    const jokeItem = new Joke(joke);
    await Joke.create(jokeItem);
    return;
  } catch (e) {
    throw new Error(e);
  }
}

const amassTrainingData = async (n) => {
  db;
  for (let i = 0; i < n; i += 1) {
    console.log(`On item: ${i}`);
    await saveJokes();
  }
  db.close();
};

amassTrainingData(50000);
