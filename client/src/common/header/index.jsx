import React from 'react';
import { Navbar, Nav , Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
      return ( 
            <div>
            <Navbar bg="light" expand="lg" sticky="top">
            <LinkContainer to={'/'}>  
                <Navbar.Brand>Mikhail Korchevskiy</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to={'/about_me'}>
                    <Nav.Link>About me</Nav.Link>
                </LinkContainer>
                <Nav.Link href="#portfolio">Portfolio</Nav.Link>
                <Nav.Link href="#resume">Resume</Nav.Link>
                </Nav>
                <div className="right">Work In Progress!</div>
            </Navbar.Collapse>
            </Navbar>
            </div>
      );
    }
  }
  
  export default Header;
  