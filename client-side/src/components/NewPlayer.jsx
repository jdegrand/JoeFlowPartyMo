import React from 'react';
import '../css/common.css';
import * as fconfig from '../config';

import openSocket from 'socket.io-client';

const socket = openSocket("http://"+ fconfig.returnAddress() + ":3300");

class NewPlayer extends React.Component {
    state = { name: '', didSubmit: false };

    onFormSubmit = (event) => {
        event.preventDefault();
        socket.emit("newPlayer", this.state.name)
        this.setState({ didSubmit: true });
    }

    renderName = () => {
        console.log(this.state)
        if (!this.state.didSubmit) {
            return (
                <form onSubmit={ this.onFormSubmit }>
                    <div className="center">
                        <label>Enter Name</label>
                        <div>
                            <input type="text" value={ this.state.name } onChange={ (e) => this.setState({ name: e.target.value }) } />
                            <button type="submit" onTouchEnd={ this.onFormSubmit } >All Set</button>
                        </div>
                    </div>
                </form>
            );  
        } else {
            return <div>Welcome { this.state.name }! </div>;
        }
    };

    render() {
        return this.renderName();
    };
}

export default NewPlayer;