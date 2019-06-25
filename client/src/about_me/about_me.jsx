import React from 'react';
import { Image, Jumbotron, Container, Col, Row} from 'react-bootstrap';
import './style.css';
import Header from '../common/header';

class AboutMe extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
      return (
        <mp>   
            <Image src={require('./img/banner.png')} width='100%' max-height='20%' className='img-responsive'/>
            <Header />
                <Jumbotron style={{'background-color': '#CDCDCD'}} fluid>
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
  