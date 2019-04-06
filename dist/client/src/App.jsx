import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "Waiting... "
    }
    this.call_backend = this.call_backend.bind(this);
  }

  call_backend() {
    axios.get('/api/tmp')
      .then((resp) => {
        this.setState({
          message: resp.data.msg,
        });
      })
      .catch((err) => {
        console.log('Err: ' + err.message);
      });

  }

  render() {
    return (
      <div>
        <b> How about a message? </b><br />
        {this.state.message} <br />
        <button onClick={this.call_backend}>Ok</button>

      </div>
    );
  }
}

export default App;
