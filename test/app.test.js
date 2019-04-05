const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database/index');

const RandomJoke = require('../src/database/models/RandomJoke');

describe('Express server should route properly', () => {
  afterAll(() => mongoose.disconnect());
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Connected to Express on port ${PORT}`);
    db;
  });

  it('serves the client directory', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('responds appropriately to GET on /apis/movies/:movieId/reviews', (done) => {
    // mock response from mongoose
    jest
      .spyOn(RandomJoke, 'lookup')
      .mockReturnValue(Promise.resolve({ _id: 'askdjfaslfd', joke: 'lol' }));

    request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('404 everything else', (done) => {
    request(app)
      .get('/somethingbad')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
