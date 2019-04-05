import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: 'blah',
    };
    this.getNewJoke = this.getNewJoke.bind(this);
  }
  async componentDidMount() {
    try {
      this.getNewJoke();
    } catch (e) {
      console.log(e);
    }
  }

  async getNewJoke() {
    const { data } = await axios.get('http://localhost:3000/')
    console.log('e');
    this.setState({ joke: data });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="jumbotron">
          <h1 className="display-5">Bad Joke Generator</h1>
          <p className="lead">{ this.state.joke }</p>
          <div className="container">
          <div className="row">
            <div className="col-sm">
            <a href="#" onClick={this.getNewJoke}>
              <i class="fas fa-sync-alt"></i> Get New Joke
            </a>
            </div>
            <div className="col-sm">
            <a target="_blank" href="http://localhost:3000/">
              <i class="fas fa-link"></i> Permalink
            </a>
            </div>
            <div className="col-sm">
              <a target="_blank" href="https://twitter.com/intent/tweet?url=http://127.0.0.1:3000%2F&amp;text=Check+out+this+%23badjoke&amp;">
                <i class="fab fa-twitter"></i> Retweet
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;