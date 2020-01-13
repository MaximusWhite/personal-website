import React from 'react';
import { Jumbotron, Container, Col, Row} from 'react-bootstrap';
import './style.css';
import Header from '../common/header';

class AboutMe extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
      return (
        <mp>   
            <Header banner='about_me' />
                <Jumbotron style={{'backgroundColor': '#CDCDCD'}} fluid>
                        <Container >
                        <h1>About me</h1>
                        <h3>
                             I like space, as you should figure out by now :)
                        </h3>
                        </Container>
                </Jumbotron>
        </mp>
      );
    }
  }
  
  export default AboutMe;
  