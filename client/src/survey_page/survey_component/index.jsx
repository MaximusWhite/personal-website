import React from 'react';
import { Form, Button, Image, Col, Container, Row,  Spinner } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import './style.css';
import Header from '../../common/header';
import axios from 'axios';

class MainSurveyComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: sessionStorage.getItem('username'),
            first_name: sessionStorage.getItem('first_name'),
            caption_id: -1,
            image_id: -1,
            caption: 'NULL',
            image_link: null,
            image_loading: false,
            image_loaded: false,
            caption_received: false,
            ready_to_submit: false,
            response_submitting: false
        }
        this.requestCaption = this.requestCaption.bind(this);
        this.captionPanel = this.captionPanel.bind(this);
        this.registerLoading = this.registerLoading.bind(this);
        this.registerLoaded = this.registerLoaded.bind(this);
        this.evaluationPanel = this.evaluationPanel.bind(this);
        this.revealSubmit = this.revealSubmit.bind(this);
        this.sendEvaluation = this.sendEvaluation.bind(this);
        this.resetPage = this.resetPage.bind(this);

        this.requestCaption();
    }

    resetPage() {
        this.setState({
            caption_id: -1,
            image_id: -1,
            caption: 'NULL',
            image_link: null,
            image_loading: false,
            image_loaded: false,
            caption_received: false,
            ready_to_submit: false,
            response_submitting: false
        })
    }

    async requestCaption() {
        await axios.post('/api/draw_caption', {
            username: this.state.username
        }).then(res => {
            this.setState({
                caption_received: true,
                caption_id: res.data.caption_id,
                caption: res.data.caption,
                image_id: res.data.image_id,
                image_link: res.data.link
            });
        }).catch(err => {
            console.log(err.message);
        });
    }

    registerLoading() {
        this.setState({
            image_loading: true
        });
    }

    registerLoaded() {
        this.setState({
            image_loaded: true
        });
    }

    async sendEvaluation(e) {
        e.preventDefault();
        let score = -1;
        for(let i = 1; i < 11; i++) {
            if (document.getElementById(`resp${i}`).checked == true) {
                score = i;
            }
        }

        this.setState({
            response_submitting: true
        });

        await axios.post('/api/register_response', {
            username: this.state.username,
            caption_id: this.state.caption_id,
            image_id: this.state.image_id,
            caption_score: score
        }).then(res => {
            if (res.data.status == 'OK') {
                this.resetPage();
                this.requestCaption();
            } else {
                console.log('ERROR SUBMITTING RESPONSE');
            }
            
        }).catch(err => {
            console.log(err.message);
        });
    }

    revealSubmit() {
        this.setState({
            ready_to_submit: true
        });
    }

    evaluationPanel() {
        return (
            <div>
            <Row className="text-center my-3">
                <Col>
                    Please, evaluate how close is the original image to what you imagined after reading the caption:
                </Col>
            </Row>
            <Row className="text-center my-3">
                <Col>
                    <Form onSubmit={this.sendEvaluation}>
                        <Form.Group onChange={this.revealSubmit}>
                            {
                                (() => {
                                    let tmp = [];
                                    for (let i = 1; i < 11; i++) {
                                        tmp.push(
                                            <Form.Check inline label={`${i}`} key={`radio-${i}`}  name="eval" type='radio' id={`resp${i}`} />
                                        );
                                    }
                                    return tmp;
                                })()
                            }
                        </Form.Group>
                        {this.state.ready_to_submit ? 
                            <Button variant="primary" type="submit">Submit</Button>
                            : ''
                        }
                        {this.state.response_submitting ? this.showSpinner() : ''}
                    </Form>
                </Col>
            </Row>
            
            </div>
        );
    }

    captionPanel() {
        return (
        <Container>
            <Row>
                <Container style={{ fontSize: "20pt" }} className="border mt-3">
                    <Row className="text-center">
                        <Col>
                            <b>Caption:</b>
                        </Col>
                    </Row>
                    <Row className="text-center mb-3">
                        <Col>
                            {this.state.caption}
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row className="text-center my-3">

                {this.state.image_loading ? 
                        (this.state.image_loaded ? '' : this.showSpinner())
                        :  
                    (<Col> 
                        <Button onClick={this.registerLoading} variant="secondary">Reveal image</Button>
                    </Col>)
                }  
            </Row>
            { this.state.image_loading ? 
                <Row className="text-center my-3">
                    <Col>
                        <Image fluid src={this.state.image_link} onLoad={this.registerLoaded}></Image>
                    </Col>
                </Row>
            : ''}

            { this.state.image_loaded ? this.evaluationPanel() : ''}
            
        </Container>);
    }

    showSpinner() {
        return (
            <Container key='spinner' className="text-center my-3">
                <Row>
                    <Col>
                        <Spinner animation="grow" variant="primary" />
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {
      return (
        <div> 
            {this.state.caption_received ? this.captionPanel() : this.showSpinner() }
        </div>
      );
    }
  }
  
  export default MainSurveyComponent;
  