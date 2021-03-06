const fs = require('fs');

const assignWordFromWeights = (wordWeights) => {
  // generate CDF function
  const CDF = {};
  const keys = Object.keys(wordWeights);
  for (let i = 0; i < keys.length; i += 1) {
    CDF[keys[i]] = 0;
    for (let j = 0; j <= i; j += 1) {
      CDF[keys[i]] += wordWeights[keys[j]];
    }
  }
  // get random
  const rand = Math.random();
  // pick corresponding word
  let picked;
  for (let i = 0; i < keys.length; i += 1) {
    if (rand < CDF[keys[i]]) {
      picked = keys[i];
    }
  }
  return picked;
};

const generateRandomJoke = () => {
  const firstWords = JSON.parse(fs.readFileSync(`${__dirname}/firstWords.json`));
  const firstPunchlineWord = JSON.parse(fs.readFileSync(`${__dirname}/firstWordsAfterQuestionMark.json`));
  const questionModel = JSON.parse(fs.readFileSync(`${__dirname}/questionModel.json`));
  const punchlineModel = JSON.parse(fs.readFileSync(`${__dirname}/punchlineModel.json`));

  // generate question
  const question = [];
  let word = firstWords[Math.floor(Math.random() * firstWords.length)];

  while (word !== '?' && question.length < 10) {
    question.push(word);
    word = assignWordFromWeights(questionModel[word]);
  }

  // generate punchline
  const punchline = [];
  word = firstPunchlineWord[Math.floor(Math.random() * firstPunchlineWord.length)];
  while (word !== '.' || word !== '!' && punchline.length < 10) {
    punchline.push(word);
    if (word === '.' || word === '!') break;
    word = assignWordFromWeights(punchlineModel[word]);
  }
  return `${question.join(' ')}? ${punchline.join(' ')}`;
};

module.exports = generateRandomJoke;
