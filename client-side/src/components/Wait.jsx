import React from 'react';
import openSocket from 'socket.io-client';
import '../css/Wait.css';

const socket = openSocket("http://localhost:3300/");


class Wait extends React.Component {
    handleTouch = (event) => {
        console.log(event.type);
        event.preventDefault();
    };

    render() {
        return (
            <div className="wait" onTouchMove={this.handleTouch} onMouseMove={this.handleTouch} onTouchCancel={this.handleTouch} onTouchStart={this.handleTouch}>
                <div className="text">
                    Waiting for server...
                </div>
            </div>
        );
    }
}

export default Wait;