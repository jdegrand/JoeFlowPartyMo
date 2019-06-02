import React from 'react';
import SquareDisplay from './components/SquareDisplay';
import Wait from './components/Wait';
import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:3300/");

class App extends React.Component {
    state = { gameStarted: false, game: null };

    componentDidMount() {
        socket.on("returnGame", (name) => {
            this.setState({ gameStarted: true, game: name });
        });
    };

    render() {
        if (!this.state.gameStarted) {
            return (
                <Wait />
            );
        } else {
            return (
                <div>Starting {this.state.game}!</div>
            );
        };
    };
}

export default App