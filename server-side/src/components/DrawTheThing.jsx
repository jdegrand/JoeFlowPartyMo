import React from 'react';
import * as fconfig from '../config';

import openSocket from 'socket.io-client';

const socket = openSocket("http://"+ fconfig.returnAddress() + ":3300");

class DrawTheThing extends React.Component {
    state = { started: false, players: [] }
    players = []

    updatePlayers = () => {
        this.players = this.state.players.map(({ name }) => {
            return <li>{ name }</li>;
        });
        return this.players;
    }
    
    componentWillMount() {
        socket.emit("fetchPlayers");
        socket.on("updatePlayers", (newPlayers) => {
            this.setState({players: newPlayers});
        });
    }

    render() {
        return (
            <div>{ this.updatePlayers() }</div>
        );
    };
}

export default DrawTheThing;