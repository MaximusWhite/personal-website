import React from 'react';
//import { Image } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import about_me from './banners/about_me.png';
import portfolio from './banners/portfolio.png';
import resume from './banners/resume.png';
import thoughts from './banners/thoughts.png';
import main_page from './banners/main_page.png';
import bits from './banners/bits.png';
import { FileEarmarkArrowDown, Download } from 'react-bootstrap-icons';


const img_map = {
    'about_me': about_me,
    'portfolio': portfolio,
    'resume': resume,
    'thoughts': thoughts,
    'main_page': main_page,
    'bits': bits
};

class Header extends React.Component {

    constructor(props) {
        super();
        // console.log(bits);
        this.downloadResume = this.downloadResume.bind(this);
        this.state = {
            img_loaded: false,
        }
    }

    downloadResume(){
        axios.get('/api/download_resume', {
          responseType: 'blob'
        }).then(res => 
          {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Mikhail Korchevskiy_resume.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
          }).catch(err => {console.log(err.message)});
    }

    logout() {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    }

    render() {
      return ( 
            <div>

            <img src={img_map[this.props.banner]} width='100%' max-height='20%' /> 
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <LinkContainer to={'/'}>  
                        <Navbar.Brand>Mikhail Korchevskiy</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        {/* <LinkContainer to={'/about_me'}>
                            <Nav.Link>About me</Nav.Link>
                        </LinkContainer> */}
                        {/* <LinkContainer to={'/resume'}>
                            <Nav.Link>Resume</Nav.Link>
                        </LinkContainer> */}
                        {/* <LinkContainer> */}
                        <Nav.Link onClick={this.downloadResume}>Resume &nbsp;<Download size={20}/></Nav.Link>
                        {/* </LinkContainer> */}
                        {/* <LinkContainer to={'/portfolio'}>
                            <Nav.Link>Portfolio</Nav.Link>
                        </LinkContainer> */}
                        {/* <LinkContainer to={'/thoughts'}>
                            <Nav.Link>Thoughts</Nav.Link>
                        </LinkContainer> */}
                        <LinkContainer to={'/bits'}>
                            <Nav.Link>A bit of everything</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/research'}>
                            <Nav.Link>Research</Nav.Link>
                        </LinkContainer>
                        { sessionStorage.getItem('auth') == 'true' && sessionStorage.getItem('role') == 'admin' ?
                                    <LinkContainer to={'/admin'}>
                                        <Nav.Link>Admin hub</Nav.Link>
                                    </LinkContainer>
                                    : '' }
                        </Nav>

                        { sessionStorage.getItem('auth') == 'true' ?
                                    <LinkContainer style={{ color: 'white' }} to={'/'}>
                                        <Nav.Link className="right"  onSelect={this.logout}>Log out</Nav.Link>
                                    </LinkContainer>
                                    : '' }
                        <Nav.Link className="right">Work In Progress!</Nav.Link>
                    </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
      );
    }
  }
  
  export default Header;
  