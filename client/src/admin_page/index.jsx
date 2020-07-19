import React from 'react';
import { Button, Col, Container, Row, Spinner, Card, Accordion } from 'react-bootstrap';
import './style.css';
import Header from '../common/header';

class AdminHub extends React.Component {

    constructor(props) {
        super();
        if (sessionStorage.getItem('auth') == 'true' && sessionStorage.getItem('role') == 'admin') {
            this.state = {
                username: sessionStorage.getItem('username'),
                first_name: sessionStorage.getItem('first_name'),
                logged_in: true,
            }
        } else {
            this.state = {
                logged_in: false
            }
        }

    }
    
    turnAway() {
        return (
          <Container style={{ fontSize: "22pt" }} className="border mt-3">
            <Row className="text-center mt-3">
              <Col>You do not belong here. Go home.</Col>
            </Row>
          </Container>);
    }

    render() {
      return (
        <mp>   
            <Header banner='bits' />
            {this.state.logged_in == true ?
            [
                <h1>Admin hub</h1>
            ]
          :
            this.turnAway()
          }
            
        </mp>
      );
    }
  }
  
  export default AdminHub;
  