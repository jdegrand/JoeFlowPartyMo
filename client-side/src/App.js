import React from 'react';
import SquareDisplay from './components/SquareDisplay';
import DrawTheThing from './components/DrawTheThing';
import Wait from './components/Wait';
import * as fconfig from './config';
import openSocket from 'socket.io-client';

const socket = openSocket("http://"+ fconfig.returnAddress() + ":3300");

class App extends React.Component {
    state = { gameStarted: false, game: null };

    componentDidMount() {
        socket.on("returnGame", (name) => {
            console.log("name ", name);
            this.setState({ gameStarted: true, game: name });
        });
    };

    renderGame = () => {
        const game = this.state.game;
        console.log(game);
        if (game === "Draw The Thing") {
            return (
                <div style={{width: "100vw"}}>
                    <DrawTheThing />
                </div>
            );

        } else if (game === "Crazy MadLibs") {
            return <div>Crazy</div>;
        } else {
            return <div>Error!</div>;
        }
    };

    render() {
        if (!this.state.gameStarted) {
            return (
                <Wait />
            );
        } else {
            return (
                this.renderGame()
                // <div>Starting {this.state.game}!</div>
            );
        };
    };
}

export default App