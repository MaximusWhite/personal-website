import React from 'react';
import './style.css';
import { Card, Col, Row, Container} from 'react-bootstrap';
import Header from '../common/header';

class Bits extends React.Component {

    constructor(props) {
        super();
        this.constructTrack = this.constructTrack.bind(this);
    }
    
    constructTrack(source, name) {
      {/* SOUNDCLOUD STUFF */}
      return (<div>
            <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src={source + "&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"}></iframe>
            <div style= {{
            fontSize: '10px', 
            color: '#cccccc', 
            lineBreak: 'anywhere',
            wordBreak: 'normal',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
            fontWeight: 100 }}>
            <a href="https://soundcloud.com/user-884452917" title="MaximusWhite" target="_blank" style={{color: '#cccccc', textDecoration: 'none'}}>MaximusWhite</a> · 
            <a href="https://soundcloud.com/user-884452917/chill" title="Chill" target="_blank" style={{color: '#cccccc', textDecoration: 'none'}}>{name}</a>
            </div>
        </div>
      );
    }

    render() {
      return (
        <mp>   
          <Header banner='bits' />
          <Row>
            <Col xs={0} sm={1} md={2} lg={2}></Col>
            <Col xs={12} sm={10} md={8} lg={8}>
              <Card>
              <Card.Header>Some of my music</Card.Header>
                <Card.Body>
                      {this.constructTrack("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/479011158", "String Beat")}
                      {this.constructTrack("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367047395", "Chill")}
                      {this.constructTrack("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/462131796", "Lo-Fi-ish")}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={0} sm={1} md={2} lg={2}></Col>
          </Row>
        </mp>
      );
    }
  }
  
  export default Bits;
  