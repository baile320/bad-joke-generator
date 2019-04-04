const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbHostName = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbDatabaseName = process.env.DB_NAME || 'badjokes';

const db = mongoose.connect(`mongodb://${dbHostName}:${dbPort}/${dbDatabaseName}`,
  { useNewUrlParser: true })
  .then(() => console.log(`Successfully connected to Mongo database ${dbDatabaseName}`))
  .catch(err => console.log(err));

module.exports = db;
