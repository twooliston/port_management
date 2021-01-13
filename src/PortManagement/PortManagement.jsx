import React from 'react';
import './PortManagement.css';

import * as NewShip from '../PortManagementLogic/newShip.js';
import * as NewTrain from '../PortManagementLogic/newTrain.js';
import * as Show from '../PortManagementLogic/show.js';
import * as Unload from '../PortManagementLogic/unload.js';

import PopupComponent from '../components/PopupComponent';

import ship from '../images/ship.png';
import empty from '../images/empty.png';
import cargo from '../images/cargo.png';
import blank from '../images/blank.png';
import coupling from '../images/coupling.png';
import wall from '../images/wall.png';
import wheel from '../images/wheel.png';
import chimney from '../images/chimney.png';
import crane from '../images/crane.png';
import rail from '../images/rail.png';
import hut from '../images/hut.png';
import information from '../images/information.png';

export class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        // created stacks to monitor the movement of containers

        this.state = {
            port_view: [],
            ship_stack: [],
            storage_stack: [],
            train_stack: [],

            isOpen: false,
        };
    }

    componentDidMount() {
        this.show();
    }

    receive_ship() {
        let ship_stack = NewShip.receive_ship();
        this.setState({ship_stack}, function () {
            this.show();
        });
    }

    train_send() {
        let train_stack = NewTrain.train_send();
        this.setState({train_stack}, function () {
            this.show();
        });
    }

    unload() {
        let {ship_stack, storage_stack, train_stack} = this.state;
        let stacks = Unload.unload(ship_stack, storage_stack, train_stack);
        ship_stack = stacks.ship_stack;
        storage_stack = stacks.storage_stack;
        train_stack = stacks.train_stack;
        this.setState({ship_stack, storage_stack, train_stack}, function () {
            this.show();
        });
    }

    show() {
        let {port_view, ship_stack, storage_stack, train_stack} = this.state;
        port_view = Show.show(ship_stack, storage_stack, train_stack);
        this.setState({port_view});
    }

    render() {
        let port_view = this.state.port_view;
        if (port_view.length) {
            for (let i = 0; i < port_view.length; i++) {
                for (let j = 0; j < port_view[i].length; j++) {
                    switch (port_view[i][j]) {
                        case "V":
                            port_view[i][j] = ship;
                            break;
                        case "X":
                            port_view[i][j] = cargo;
                            break;
                        case "D":
                            port_view[i][j] = hut;
                            break;
                        case "i":
                            port_view[i][j] = chimney;
                            break;
                        case "%":
                            port_view[i][j] = wheel;
                            break;
                        case ":":
                            port_view[i][j] = coupling;
                            break;
                        case "-":
                            port_view[i][j] = wheel;
                            break;
                        case "A":
                            port_view[i][j] = crane;
                            break;
                        case "_":
                            port_view[i][j] = rail;
                            break;
                        case " ":
                            port_view[i][j] = empty;
                            break;
                        case "":
                            port_view[i][j] = blank;
                            break;
                        case "|":
                            port_view[i][j] = wall;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        return (
            <div className="view">
                <h1>Port Management</h1>
                <div className="grid-container">
                    {port_view.map((rows) => (
                        rows.map((value, index) => (
                            <div className="grid-item" key={index}><img src={value} alt=""/></div>
                        ))
                    ))}
                </div>
                <PopupComponent isOpen={this.state.isOpen} onClose={() => this.setState({isOpen: false})}>
                    <h3>The Map</h3>
                    <p><u>The Grid:</u> the grid represents a visual map of the port, showing the status of the ship, storage and the train.</p>
                    <p><u>The Ship:</u> the ship can be seen on hte left of the screen. Initially 5 empty spaces vertically, but will be filled
                        with cargo and a ship icon at the manipoulation of the "Receive New Ship" button. The ship can hold 4 cargo containers.</p>
                    <p><u>The Storage:</u> the storage is located between the two brick walls. The storage can hold upto 5 cargo containers.</p>
                    <p><u>The Train:</u> the train is located on the bottom right. The train (the back of the train whihc is the on the left hand side of the train) can hold upto 3 cargo containers.</p>
                    <h3>The Buttons</h3>
                    <p><u>Receive New Ship:</u> This button gets a new ship to arrive at the port filled with maximum cargo containers (4)</p>
                    <p><u>Unload:</u> This button removes as many containers as possible from the ship to the storage and from the storage to the train</p>
                    <p><u>Send Train:</u> this button send the train off with its current containers and calls in a new empty train, ready to transport more containers</p>
                </PopupComponent>
                <div className="buttons">
                    <button onClick={() => this.receive_ship()}>Receive New Ship</button>
                    <button onClick={() => this.unload()}>Unload</button>
                    <button onClick={() => this.train_send()}>Send Train</button>
                    <button className="help-button" onClick={() => this.setState({isOpen: !this.state.isOpen})}><img src={information}/></button>
                </div>
            </div>
        );
    }
}

export default SortingVisualiser;