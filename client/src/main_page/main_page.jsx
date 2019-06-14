import React from 'react';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl} from 'react-bootstrap';
import './style.css';

class MainPage extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
      return (
        <mp>  
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Mikhail Korchevskiy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">About me</Nav.Link>
                <Nav.Link href="#link">Portfolio</Nav.Link>
                <Nav.Link href="#link">Resume</Nav.Link>
                </Nav>
                <div className="right">Work In Progress!</div>
            </Navbar.Collapse>
            </Navbar>
        </mp>
      );
    }
  }
  
  export default MainPage;
  