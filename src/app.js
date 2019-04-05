const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const generateRandomJoke = require('./utils/generateRandomJoke');
const RandomJoke = require('./database/models/RandomJoke');

dotenv.config();

const app = express();

app.use(express.static('./client/build'))
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(`${__dirname}/../client/dist`)));
app.use(morgan('dev'))

app.get('/api', (req, res) => {
  const newJoke = generateRandomJoke();
  RandomJoke
    .save({ joke: newJoke })
    .then(joke => res.json(joke))
    .catch(err => console.log(err));
});

app.get('/api/:jokeId', (req, res) => {
  const { jokeId } = req.params;
  RandomJoke
    .lookup(jokeId)
    .then(joke => res.json(joke))
    .catch(err => console.log(err));
});

module.exports = app;
