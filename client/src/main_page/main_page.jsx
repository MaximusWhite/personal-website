import React from 'react';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl, Image, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../common/header';
import MineSweeper from '../minesweeper/minesweeper';

class MainPage extends React.Component {
    constructor(props) {
        super();
    }
    
    render() {
      return (
        <div>
          <mp>   
              <Header banner={'main_page'} />
          </mp>
          <MineSweeper height={10} width={20} mines={20} />
        </div>
      );
    }
  }
  
  export default MainPage;
  