const dotenv = require('dotenv');
const app = require('./app');
const db = require('./database/index');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Connected to Express on port ${PORT}`);
  db;
});
