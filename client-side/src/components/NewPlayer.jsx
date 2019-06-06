import React from 'react';
import '../css/common.css';
import * as fconfig from '../config';

import openSocket from 'socket.io-client';

const socket = openSocket("http://" + fconfig.returnAddress() + ":3300");

class NewPlayer extends React.Component {
    state = { name: '', didSubmit: false, error: '' };

    onFormSubmit = (event) => {
        event.preventDefault();
        socket.emit("newPlayer", this.state.name);
        socket.on("newPlayerSuccessful", (result) => {
            if (result) {
                this.props.login(this.state.name)
            } else {
                this.setState({ error: "Name already in use!" })
            }
        });
    }

    renderName = () => {
        console.log(this.state)
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="center">
                    <label>Enter Name</label>
                    <label style={{ color: 'red' }}>{this.state.error}</label>
                    <div>
                        <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        <button type="submit" onTouchEnd={this.onFormSubmit} >All Set</button>
                    </div>
                </div>
            </form>
        );
    };

    render() {
        return this.renderName();
    };
}

export default NewPlayer;