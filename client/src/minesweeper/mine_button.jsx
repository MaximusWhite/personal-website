import React from 'react';
import { IoMdFlag } from 'react-icons/io';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl, Image, Col, Container} from 'react-bootstrap';
import './style.css';

class MineButton extends React.Component {
    constructor(props) {
        super();
        var style;
        switch(props.value) {
            case 'X':
                style = 'mine-opened-mine';
                break;
            case ' ':
                style = 'mine-opened-empty';
                break;
            default: 
                style = 'mine-opened-' + props.value
        }

        this.state = {
            status: props.status,
            style: style,
            value: props.value,
            location: props.location,
            click_callback: props.click_callback,
            mode: 0
        }
        this.call = this.call.bind(this);
        this.get_style = this.get_style.bind(this);
        this.get_face = this.get_face.bind(this);
    }

    call(e){
        e.preventDefault();
        if (this.state.status != 'open') {
            if (e.button === 0 && this.state.mode != 1) {
                this.state.click_callback(this.state.location[0], this.state.location[1]);
            } else if (e.button === 2) {
                var next_mode = this.state.mode == 2 ? 0 : this.state.mode + 1;
                this.setState({
                    mode: next_mode
                });
            }
        }
    }

    get_style() {
        return this.state.status == 'closed' ? 'mine-closed' : this.state.style;
    }

    get_face() {
        if (this.state.status == 'open') {
            return this.state.value;
        } else {
            switch(this.state.mode) {
                case 0: 
                    return ' ';
                case 1:
                    return <IoMdFlag style={{color: 'rgb(200, 0, 0, 0.75)'}} />;
                default:
                    return '?';
                    
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
         status: nextProps.status,
        };
    }

    render() {
      return (
        <Button 
            onContextMenu={(e) => {this.call(e);}} 
            onClick={(e) => {this.call(e)}} 
            bsPrefix={ this.get_style()} 
            style={{ width: `${Math.floor(100 / this.props.grid_sizing)}%` }}
            >
            {this.get_face()}
        </Button>
      );
    }
  }
  
  export default MineButton;
  