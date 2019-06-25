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
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <LinkContainer to={'/'}>  
                <Navbar.Brand>Mikhail Korchevskiy</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to={'/about_me'}>
                    <Nav.Link>About me</Nav.Link>
                </LinkContainer>
                <LinkContainer to={'/resume'}>
                    <Nav.Link>Resume</Nav.Link>
                </LinkContainer>
                <LinkContainer to={'/portfolio'}>
                    <Nav.Link>Portfolio</Nav.Link>
                </LinkContainer>
                <LinkContainer to={'/thoughts'}>
                    <Nav.Link>Thoughts</Nav.Link>
                </LinkContainer>
                <LinkContainer to={'/bits'}>
                    <Nav.Link>A bit of everything</Nav.Link>
                </LinkContainer>
                </Nav>
                <Nav.Link className="right">Work In Progress!</Nav.Link>
            </Navbar.Collapse>
            </Navbar>
            </div>
      );
    }
  }
  
  export default Header;
  