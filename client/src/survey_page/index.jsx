import React from 'react';
import { Button, Col, Container, Row, Spinner, Card, Accordion } from 'react-bootstrap';
import './style.css';
import Header from '../common/header';
import MainSurveyComponent from './survey_component';

class SurveyPage extends React.Component {
    constructor(props) {
      super();
      if (props.location.state) {
        this.state = {
          username: props.location.state.username,
          first_name: props.location.state.first_name,
          logged_in: props.location.state.logged_in,
        }
        sessionStorage.setItem('auth', 'true');
        sessionStorage.setItem('username', props.location.state.username);
        sessionStorage.setItem('first_name', props.location.state.first_name);
        console.log('Logged in directly');
      } else if (sessionStorage.getItem('auth') == 'true'){
        this.state = {
          username: sessionStorage.getItem('username'),
          first_name: sessionStorage.getItem('first_name'),
          logged_in: true,
        }
        console.log('Logged in via token');
      } else {
        console.log('Not logged in');
        this.state = {
          logged_in: false,
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

    mainSurveyElement() {
      return <Spinner animation="grow" variant="primary" />;
    }

    instructions() {
      return (
          <Accordion key='carl' defaultActiveKey="1">
            <Card>
              <Accordion.Toggle as={Button} variant="outline-dark link" eventKey="0">
                Instructions
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Row className="text-center my-12">
                      <Col>1. Read the caption and try to visualize what it describes to you </Col>
                    </Row>
                    <Row className="text-center my-12">
                      <Col>2. Once you have a relatively clear imagery in your head, click <b>"Reveal image"</b></Col>
                    </Row>
                    <Row className="text-center my-12">
                      <Col>3. Look at the image and think <i>how close is the image to what you imagined</i> on a scale from 1 to 10</Col>
                    </Row>
                    <Row className="text-center my-12">
                      <Col>4. Once your decision is made, select appropriate score and click <b>"Submit"</b></Col>
                    </Row>
                    <Row className="text-center my-12">
                      <Col><b>Note: </b> There is no right or wrong answer here! Just select the scores on your personal judgement </Col>
                    </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
      );
    }

    render() {
      return (
        <div> 
          <Header banner={'survey'} name={this.state.first_name || null } />
          {this.state.logged_in == true ?
            [
              this.instructions(),
              <Container><MainSurveyComponent key='bob' /></Container>
            ]
          :
            this.turnAway()
          }
        </div>
      );
    }
  }
  
  export default SurveyPage;
  