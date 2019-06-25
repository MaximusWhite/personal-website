import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import axios from 'axios';
import routes from './routes';
import MainPage from './main_page/main_page';

class App extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
    );
  }
}

export default App;
