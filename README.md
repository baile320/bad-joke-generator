## Introduction
This app is a random joke generator. It uses jokes scraped from icanhazdadjoke.com to create a markov chain, and uses the probabilities from that chain to generate new jokes.

### App Structure
  - /client: Contains the React app.
  - /src: Contains the Express API server.
    - /src/database: Contains the DB connection.
      -/src/database/models: Contains the DB schema & helper methods.
    - /src/utils:
      *.json: The parsed data used to build the markov chain.
      *.js: The helper methods and functions used to scrape, aggregate, analyze, and generate the markov chain.

### Requirements
MongoDB, node/npm

### How to run the app
Run `npm install` in the root directory and the client directory.
To build the react bundle, run `npm run build` from the client directory.
To start the local server, run `npm run start-dev` from the root directory.
Navigate to the localhost webpage (defaults to http://127.0.0.1:3000).

### Example
![A gif of the app in action](https://i.imgur.com/5cxSAkv.gif)
