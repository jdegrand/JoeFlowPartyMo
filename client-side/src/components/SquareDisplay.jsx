import React from 'react';
import * as fconfig from '../config';

import openSocket from 'socket.io-client';

const socket = openSocket("http://"+ fconfig.returnAddress() + ":3300");

class SquareDisplay extends React.Component {
    state = {color: null }

    componentWillMount() {
        socket.emit("current");
        socket.on("colorReturn", (color) => {
            this.setState({ color: color})
        });
    }

    onClick = () => {
        socket.emit("tap");

        socket.on("colorChange", (color) => {
            this.setState({
                color: color
            })
        });
    }

    render() {
        return (
            <div>
                <svg width="100" height="100">
                    <rect width="100" height="100" style={{ fill: `${this.state.color}`, strokeWidth: '3', stroke: 'rgb(0,0,0)' }} onClick={this.onClick} />
                </svg>
            </div>
        );
    }
}

export default SquareDisplay;