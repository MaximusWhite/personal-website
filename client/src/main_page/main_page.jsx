import React from 'react';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl, Image, Col} from 'react-bootstrap';
import './style.css';
//import banner_str from '../../public/img/banner.jpg';

class MainPage extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
      return (
        <mp>   
            <Image src={require('../img/banner2.jpg')} width='100%' max-height='20%' className='img-responsive'/>
            <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand href="#home">Mikhail Korchevskiy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#about_me">About me</Nav.Link>
                <Nav.Link href="#portfolio">Portfolio</Nav.Link>
                <Nav.Link href="#resume">Resume</Nav.Link>
                </Nav>
                <div className="right">Work In Progress!</div>
            </Navbar.Collapse>
            </Navbar>
            {(() => {
              const tmp = [];
              for (var i = 0; i < 100; i++) {
                  tmp.push(<p>agadfdasfhfsfsdjfg js fjdfjdfj  hfghkkfgkg</p>);
              }
              return tmp;
            })()}
        </mp>
      );
    }
  }
  
  export default MainPage;
  