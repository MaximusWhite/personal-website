import React from 'react';
import { Navbar, Form, Button, Nav, NavDropdown, FormControl, Image, Col, Row, Container} from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import './style.css';
import Header from '../common/header';
import MineButton from './mine_button';

class MineSweeper extends React.Component {
    constructor(props) {
        super();
        this.check_click = this.check_click.bind(this);
        this.construct_grid = this.construct_grid.bind(this);
        this.construct_reference = this.construct_reference.bind(this);
        this.get_all_connections = this.get_all_connections.bind(this);
        // const size = props.size;
        const height = props.height;
        const width = props.width;
        const mines = props.mines;
        var placed = 0;
        var mine_locations = [];
        const distribution_threshold = mines / (height * width);

        // Creating field
        var field = [];
        for (var i = 0; i < height; i++){
            var row = [];
            for (var j = 0; j < width; j++){
                row.push(0);
            }
            field.push(row);
        }

        // Filling field with mines
        var MinesFilledException = {}
        try {
            while (placed != mines) {
                field.forEach((row, r_ind) => {
                    row.forEach((cell, c_ind) => {
                        if (field[r_ind][c_ind] == 0) {
                            const roll = Math.random();
                            if (roll < distribution_threshold) {
                                field[r_ind][c_ind] = 'X';
                                placed++; 
                                mine_locations.push([r_ind, c_ind]);
                                console.log(placed +' placed');
                            }
                            if (placed == mines) throw MinesFilledException;
                        }
                    });
                });
            }
        } catch(e) {
            if (e !== MinesFilledException) throw e;
            console.log('DONE');
        }
        
        // Lookup neighbouring cells for mines
        const lookup_neighbours = (r_ind, c_ind) => {
            const offsets = [-1, 0, 1];
            var total = 0;
            offsets.forEach((r_off) => {
                offsets.forEach((c_off) => {
                    if (field[r_ind + r_off] != undefined && field[r_ind + r_off][c_ind + c_off] == 'X') {
                        total++;
                    }
                });
            });

            return total > 0 ? total : ' ';
        }

        // creating finalized field
        var grid = [];
        for (var r = 0; r < height; r++) {
            var row = [];
            for (var c = 0; c < width; c++) {
                var cell = {
                    value: field[r][c],
                    status: 'closed',
                    location: [r, c]
                }

                if (field[r][c] != 'X') {
                    cell.value = lookup_neighbours(r, c);
                    field[r][c] = lookup_neighbours(r, c);
                }
                row.push(cell);
            }
            grid.push(row);            
        }

        this.state = {
            mine_locations: mine_locations,
            // size: size,
            height: height,
            width: width,
            mines: mines,
            map: field,
            field: grid
        };
    }

    get_all_connections(r, c, locations) {
        const offsets = [-1, 0, 1];
        offsets.forEach((r_off) => {
            offsets.forEach((c_off) => {
                if (this.state.field[r+r_off] != undefined) {
                    if (this.state.field[r + r_off][c + c_off] != undefined){
                        switch(this.state.field[r + r_off][c + c_off].value) {
                            case ' ':
                                if (!locations.has([r + r_off, c + c_off].toString())) {
                                    locations.add([r + r_off, c + c_off].toString());
                                    var sub_locs = this.get_all_connections(r + r_off, c + c_off, locations);
                                    sub_locs.forEach((l) => {
                                        locations.add(l);
                                    });
                                }
                                break;
                            case 'X':
                                break;
                            default:
                                locations.add([r + r_off, c + c_off].toString());
                                break;
                        }
                    }
                }
            });
        });

        return locations;
    }

    check_click(r,c) {

        var new_field = this.state.field;

        if (new_field[r][c].value == 'X') {
            this.state.mine_locations.forEach((loc) => {
                new_field[loc[0]][loc[1]].status = 'open';
            });
        } else if (new_field[r][c].value != ' ') {
            new_field[r][c].status = 'open';
        } else {
            var locations = this.get_all_connections(r, c, new Set([[r, c].toString()]));
            locations.forEach((l) => {
                var loc = l.split(',');
                new_field[parseInt(loc[0])][parseInt(loc[1])].status = 'open';
            });
        }

        this.setState({
            field: new_field
        });
    }

    construct_grid() {
        var grid = [];
        this.state.field.forEach((r) => {
            var row = [];
            r.forEach((cell) => {
                row.push(<MineButton key={`button${cell.location[0]}:${cell.location[1]}`} value={cell.value} status={cell.status} location={cell.location} click_callback={this.check_click}/>);
            });
            grid.push(<Row  key={`row${r[0].location[0]}`}>
                {row}
                </Row>);
        });

        return grid;
    }

    construct_reference() {
        var grid = []
        this.state.field.forEach((r) => {
            var row = []
            r.forEach((cell) => {
                row.push(<MineButton 
                    key={`button${cell.location[0]}:${cell.location[1]}2`} 
                    value={cell.value} 
                    status={'open'} 
                    location={cell.location} 
                    click_callback={this.check_click}
                    grid_sizing={this.state.width}
                    />);
            });
            grid.push(<Row key={`row${r[0].location[0]}2`}>{row}</Row>);
        });

        return grid;
    }

    render() {
      return (
        <div>
            <Container fluid style={{ fontSize: '2vw', marginLeft: '10%', marginBottom: '10%'}} className='center'>
                <Col align='center'> 
                <Row> <h1>Minesweeper (work in progress)</h1></Row>
                {this.construct_grid()}
                </Col>
            </Container>
        </div>
      );
    }
  }
  
  export default MineSweeper;
  