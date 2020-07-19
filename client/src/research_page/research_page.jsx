import React from 'react';
import { Form, Button, Col, Container, Row, Modal, Alert} from 'react-bootstrap';
import './style.css';
import Header from '../common/header';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ResearchPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
          show_modal: false,
          modal_type: 'log',
          modal_msg: 'NULL',
          login_failed: false,
          signup_completed: false,
          signup_failed: false,
          signup_err_msg: 'NULL'
        }

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.cleanupLoginModal = this.cleanupLoginModal.bind(this);
        this.cleanupSignupModal = this.cleanupSignupModal.bind(this);
        this.nonLogged = this.nonLogged.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }
    
    openModal(type_string) {
      this.setState({
        modal_msg: type_string == 'log'? 'Log in' : 'Request access to research',
        modal_type: type_string,
        show_modal: true
      });
    }

    closeModal() {
      this.setState({
        show_modal: false
      });
    }

    submitSignup(event) {
      event.preventDefault();
      axios.post('/api/access_req/', {
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value
      }).then((res) => {
        if (res.data.status == 'OK') {
          this.setState({
            show_modal: false,
            signup_completed: true
          });
        } else {
          this.setState({
            signup_failed: true,
            signup_err_msg: res.data.detail
          });
        }
      }).catch((err) => {
        console.log(err.message);
      });
    }

    submitLogin(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("formBasicPassword").value;
      axios.post('/api/login/', {
        username,
        password
      }).then((res) => {
        if (res.data.status == 'granted') {
          this.setState({
            show_modal: false
          });
          this.props.history.push({ 
            pathname: '/survey',
            state: {
              username,
              first_name: res.data.first_name,
              role: res.data.role,
              token: res.data.token,
              logged_in: true
            }
          })
        } else {
          this.setState({
            login_failed: true
          });
        }
      }).catch((err) => {
        console.log(err.message);
      });
    }

    cleanupLoginModal() {
      document.getElementById("username").value = '';
      document.getElementById("formBasicPassword").value = '';
      this.setState({ login_failed: false });
    }

    cleanupSignupModal() {
      document.getElementById("first_name").value = '';
      document.getElementById("last_name").value = '';
      document.getElementById("username").value = '';
      document.getElementById("email").value = '';
      this.setState({ signup_failed: false });
    }

    loginModal() {
      return (
      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={this.state.show_modal} onHide={this.closeModal}>
      <Modal.Header closeButton>
      <Modal.Title>{this.state.modal_msg}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={this.submitLogin}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {this.state.login_failed ? (
      <Modal.Footer bsPrefix={{
          textAlign: "left"
      }}>
        <Alert variant="danger" onClose={this.cleanupLoginModal} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>
            The username or password does not match the record.
          </p>
        </Alert>
      </Modal.Footer>) : ""}
      </Modal>);
    }

    signupModal() {
      return (
        <Modal size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={this.state.show_modal} onHide={this.closeModal}>
        <Modal.Header closeButton>
        <Modal.Title>{this.state.modal_msg}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.submitSignup}>
           <Form.Group controlId="first_name">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="First name" />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Last name" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Preferred username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        
        {this.state.signup_failed ? (
      <Modal.Footer bsPrefix={{
          textAlign: "left"
      }}>
        <Alert variant="danger" onClose={this.cleanupSignupModal} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>
            Detail: {this.state.signup_err_msg}
          </p>
        </Alert>
      </Modal.Footer>) : (<Modal.Footer>
        <b>Note: </b>Your request will be processed and you will be informed if you were selected to participate. </Modal.Footer>)}
        </Modal>);
    }

    nonLogged() {
      return (  
      <div>
        <Container style={{ fontSize: "22pt" }} className="border mt-3">
          <Row className="text-center mt-3">
            <Col>Welcome to the research page!</Col>
          </Row>
          <Row className="text-center">
            <Col>Please log in using existing account or request access to the survey.</Col>
          </Row>
          <Row className="text-center my-3">
            <Col md={3}></Col>
            <Col>
              <Button variant="outline-primary" onClick={() => this.openModal('log')}>Log in</Button>
            </Col>
            <Col md={2}></Col>
            <Col>
              <Button variant="outline-primary" onClick={() => this.openModal('signup')}>Request access</Button>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row>
          { this.state.signup_completed ? (<Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p> Thank you for signing up. You will be contacted via email once your request is processed.</p>
          </Alert>) : '' }
          </Row>
        </Container>
        { this.state.modal_type == 'log' ? this.loginModal() : this.signupModal() }
      </div>);
    }

    loggedIn() {
      console.log('logged');
      return (
        <Container style={{ fontSize: "30pt" }} className="border mt-3">
        <Row className="text-center mt-3">
          <Col>Hi, {sessionStorage.getItem('first_name')}! You are logged in already, please procceed to the <Link to='/survey'>survey page</Link>.</Col>
        </Row>
      </Container>
      );
    }
    render() {
      return (
        <div> 
          <Header banner={'main_page'} />
          { sessionStorage.getItem('auth') == 'true' ? this.loggedIn() : this.nonLogged()}
        </div>
      );
    }
  }
  
  export default ResearchPage;
  