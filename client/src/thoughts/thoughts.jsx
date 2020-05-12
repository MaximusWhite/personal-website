import React from 'react';
import './style.css';
import Header from '../common/header';

class Thoughts extends React.Component {

    constructor(props) {
        super();

    }
  
    render() {
      return (
        <mp>   
            <Header banner='thoughts' />
            <h1>THOUGHTS</h1>
        </mp>
      );
    }
  }
  
  export default Thoughts;
  