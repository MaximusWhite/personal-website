import React from 'react';
import { Image } from 'react-bootstrap';
import './style.css';
import Header from '../common/header';

class Portfolio extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
      return (
        <mp>   
            <Image src={require('./img/banner.png')} width='100%' max-height='20%' className='img-responsive'/>
            <Header />
            <h1>PORTFOLIO</h1>
        </mp>
      );
    }
  }
  
  export default Portfolio;
  