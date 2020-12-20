import React from 'react';
import './PortManagement.css';
import * as NewShip from '../PortManagementLogic/newShip.js';
import * as NewTrain from '../PortManagementLogic/newTrain.js';
import * as Show from '../PortManagementLogic/show.js';
import * as Unload from '../PortManagementLogic/unload.js';

import ship from '../images/ship.png';
import empty from '../images/empty.png';
import cargo from '../images/cargo.png';
import blank from '../images/blank.png';
import coupling from '../images/coupling.png';
import wagon from '../images/wagon.png';
import wall from '../images/wall.png';
import wheel from '../images/wheel.png';
import chimney from '../images/chimney.png';
import crane from '../images/crane.png';
import rail from '../images/rail.png';
import hut from '../images/hut.png';

export class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        // created stacks to monitor the movement of containers

        this.state = {
            port_view: [],
            ship_stack: [],
            storage_stack: [],
            train_stack: [],
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
        console.log(port_view);
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
                            port_view[i][j] = wheel; //wagon;
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
                <div className="buttons">
                    <button onClick={() => this.receive_ship()}>Receive New Ship</button>
                    <button onClick={() => this.unload()}>Unload</button>
                    <button onClick={() => this.train_send()}>Send Train</button>
                </div>
            </div>
        );
    }
}

export default SortingVisualiser;