import React, { Component } from 'react';
import axios from 'axios';
import MainPage from './main_page/main_page';

class App extends Component {

  constructor(props) {
    super();
  }

  render() {
    return <MainPage />;
  }
}

export default App;
