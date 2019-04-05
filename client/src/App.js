import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Joke from './Joke';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div>
          <Route exact path="/" component={Joke} />
          <Route path="/:_id" component={Joke} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;