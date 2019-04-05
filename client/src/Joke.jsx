import React, { Component } from 'react';
import axios from 'axios';
const _ = require('lodash');

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
      _id: '',
    };
    this.getNewJoke = this.getNewJoke.bind(this);
    this.getNewJokeDebounce = _.throttle(this.getNewJoke, 250);
  }
  
  async componentDidMount() {
    try {
      await this.getNewJoke();
    } catch (e) {
      console.log(e);
    }
  }

  async getNewJoke() {
    const { data } = await axios.get(`http://127.0.0.1:3000/api/`)
    this.props.history.push(`/${data._id}`);
    await this.setState({ ...data });
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
          <div onClick={this.getNewJokeDebounce} className="text-primary a" style={{cursor: "pointer"}}>
            <i className="fas fa-sync-alt"></i> Get New Joke
          </div>
          </div>
          <div className="col-sm">
            <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=http://127.0.0.1:3000%2F${this.state._id}&amp;text=Check+out+this+%23badjoke&amp;`}>
              <i className="fab fa-twitter"></i> Retweet
            </a>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Joke;
