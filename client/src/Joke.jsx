import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
      _id: '',
    };
    this.getNewJoke = this.getNewJoke.bind(this);
    this.getExistingJoke = this.getExistingJoke.bind(this);
  }
  
  async componentDidMount() {
    try {
      if (this.props.match.params._id) {
        await this.getExistingJoke();
      } else {
        await this.getNewJoke();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getNewJoke() {
    const { data } = await axios.get(`http://127.0.0.1:3000/api/`)
    this.props.history.push(`/${data._id}`);
    await this.setState({ ...data });
  }

  async getExistingJoke() {
    const _id = this.props.match.params._id || '';
    const { data } = await axios.get(`http://127.0.0.1:3000/api/${_id}`)
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
          <div onClick={this.getNewJoke} className="text-primary a" style={{cursor: "pointer"}}>
            <i className="fas fa-sync-alt"></i> Get New Joke
          </div>
          </div>
          <div className="col-sm">
          <Link to={`/${this.state._id}`}>
            <i className="fas fa-link"></i> Permalink
          </Link>
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
