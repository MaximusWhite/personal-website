import React from 'react';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl, Image, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../common/header';

const banner = require('../img/banner2.jpg');
//import banner_str from '../../public/img/banner.jpg';

class MainPage extends React.Component {

    constructor(props) {
        super();

    }
    
    render() {
      return (
        <mp>   
            <Image src={banner} width='100%' max-height='20%' className='img-responsive'/>
            <Header />
        </mp>
      );
    }
  }
  
  export default MainPage;
  