const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config();

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(`${__dirname}/../client/dist`)));

export default app;
