import React from 'react';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl, Image, Col, Container, Row, Tooltip, Overlay, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../common/header';
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import MineSweeper from '../minesweeper/minesweeper';
import face from './img/face2.jpg';
import gandalf from './img/gandalf_g.gif';

class MainPage extends React.Component {
    constructor(props) {
      super();
      this.state = {
        showGandalf: false,
        showMinesweeper: false
      }
      
     // this.updateGandalf = this.updateGandalf.bind(this);
    }

    render() {
      return (
        <div>
          <mp>   
            <Header banner={'main_page'} />
          </mp>
          <Container fluid className="fade-in-bottom">
            <Row style={{marginTop: '1%', fontSize: '2.1vh' }} >
              <Col xs={4} sm={3} md={3} lg={3}>
                <Row fluid>
                  <Image width={'80%'} style={{ borderStyle: 'solid', borderColor: '#c0c0c0', marginTop: '2%', marginLeft: '10%'}} src={face} roundedCircle />
                </Row>
                <Row>
                  <Col className={'text-center'}>
                    <b>Contacts:</b>
                  </Col>
                </Row>
                <Row>
                  <Col className={'text-center'}>
                    <b>Email: </b><i>mkorchevskiy@ryerson.ca</i>
                  </Col>
                </Row>
                <Row>
                  <Col className={'text-center'}>
                    <a href="https://www.linkedin.com/in/mikorchevskiy/"><FaLinkedin size={'40%'} style={{color: '#007bb5'}} /></a>
                    <a href="https://github.com/MaximusWhite/"><FaGithubSquare size={'40%'} style={{color: 'black'}} /></a>
                  </Col>
                </Row>
              </Col>
              <Col xs={8} sm={7} md={7} lg={7}> 
                <h1>Welcome to my (somewhat) modest website!</h1>
                <h4>Who am I?</h4>
                <p className="indented">My name's Mikhail and I'm trying my best to make some sense out of this world in various ways. <br />
                Professionaly, I am a Computer Scientist, currently working on my Master's degree specializing in Machine Learning, Deep Learning, Computer Vision. 
                At the moment, I am invovled in a research related to Image Captioning. </p>
                <p className="indented">
                  Other than that, my interests are rather vast and sometimes are counter-intuitive. 
                  I beleive in happiness in life being a product of both physical and intellectual excellence cultivated by oneself via the might of the human will. <br/>
                  Thus, over time, my interests have merged into a chimera of: <b><i>Philosophy, Science, Programming, Martial arts, Fitness, Music</i></b> and others. 
                </p>
                <h4>What is this place?</h4>
                <p className="indented">
                  Where are you? This website is meant to be a platform for displaying/sharing both my professional and personal materials. 
                  My intention is to periodically use it to collect my thoughts and projects, which will inevitably touch upon all of the aforementioned interests of mine. <br />
                </p>
                <p className="indented">
                  In fact, this website in itself is a project that I am displaying! <br />
                  Instead of using some fancy website-builder, I decided make it (relatively) from the scratch (all the curious minds can check out the <a href="https://github.com/MaximusWhite/personal-website">repo</a> for it). 
                  It ain't much, but it's honest work.
                  <br />
                  It is hosted on <b>AWS EC2</b> instance and the app itself is built with <b>Express.js</b> back-end and <b>React</b> front-end (with <b>Bootstrap</b>). 
                  There will also be a <b>PostgreSQL</b> database, that will contain all the posts displayed here as well as the data for a research-related project.
                </p>
                <h4>What now?</h4>
                <p className="indented">
                  I don't know, you came here yourself! You can check out the Minesweeper I made, though:
                </p>
              </Col>
            </Row>
            <Row>
              <Col align="text-center">
                <MineSweeper height={10} width={20} mines={20} />
              </Col>
            </Row>
          </Container>
          {/* <MineSweeper height={10} width={20} mines={20} /> */}
        </div>
      );
    }
  }
  
  export default MainPage;
  