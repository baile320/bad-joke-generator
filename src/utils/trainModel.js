const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const readData = () => {
  const jokeData = fs.readFileSync(`${__dirname}/jokes.json`, 'utf8');
  const jokes = JSON.parse(jokeData);
  return jokes;
};

const saveFirstWord = async () => {
  try {
    const jokes = readData();
    let firstWords = new Set();
    firstWords = jokes
      .filter(joke => joke.joke.includes('?'))
      .map(joke => joke.joke.split(' ')[0]);
    const result = fs.writeFileAsync(`${__dirname}/firstWords.json`, JSON.stringify(firstWords));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const saveFirstWordAfterQuestionMark = async () => {
  try {
    const jokes = readData();
    let firstWords = new Set();
    // get the first word following a question mark, if a question contains a question mark
    firstWords = jokes
      .filter(joke => joke.joke.includes('?'))
      .map(joke => joke.joke.split('?')[1].split(' ')[0]);
    const result = fs.writeFileAsync(`${__dirname}/firstWordsAfterQuestionMark.json`, JSON.stringify(firstWords));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const parseJoke = (joke, storage = {}) => {
};

/*
  Jokes appear to have the following structures:
    - Question? Punchline (. | !)
    - Punchline.
    - Statement. Punchline.

  We'll store the model like so:
  {
    word: { nextWord1: nextWord1Count, nextWord2: nextWord2Count, ... },
    nextWord: {}
    ...
  }
*/
const trainModel = async () => {
  const questionModel = {};
  const punchlineModel = {};
  const removePunc = /[.,;:’‘\r\n]/g;

  try {
    const rawJokes = JSON.parse(await fs.readFileAsync(`${__dirname}/smallJokes.json`, 'utf8'));
    const jokes = rawJokes.map(rawJoke => rawJoke.joke);
    jokes.forEach((joke) => {
      // If joke has a question mark, split on that
      if (joke.includes('?')) {
        const [question, punchline] = joke.split('?');
        // generate the question model
        const questionWords = question.replace(removePunc).split(' ');
        for (let i = 0; i < questionWords.length; i += 1) {
          const curr = questionWords[i];
          const next = questionWords[i + 1];
          questionModel[curr] = questionModel[curr] || {};
          if (i === questionWords.length - 1) {
            questionModel[curr]['?'] = questionModel[curr]['?'] + 1 || 1;
          } else {
            questionModel[curr][next] = questionModel[curr][next] + 1 || 1;
          }
        }

        // generate the punchline model;
        const punchlineWords = punchline.replace(removePunc).split(' ');

        for (let i = 0; i < punchlineWords.length; i += 1) {
          const curr = punchlineWords[i];
          const next = punchlineWords[i + 1];
          punchlineModel[curr] = punchlineModel[curr] || {};
          if (i === punchlineWords.length - 1) {
            punchlineModel[curr]['.'] = punchlineModel[curr]['.'] + 1 || 1;
          } else {
            punchlineModel[curr][next] = punchlineModel[curr][next] + 1 || 1;
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
  fs.writeFileSync(`${__dirname}/questionModel.json`, JSON.stringify(questionModel));
  fs.writeFileSync(`${__dirname}/punchlineModel.json`, JSON.stringify(punchlineModel));
};

trainModel();
