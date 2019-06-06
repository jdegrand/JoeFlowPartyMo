import React from 'react';
import PlayerCard from './PlayerCard';
import * as fconfig from '../config';
import '../css/Player.css';

import openSocket from 'socket.io-client';

const socket = openSocket("http://" + fconfig.returnAddress() + ":3300");

class PlayerLobby extends React.Component {
    state = { started: false, players: [] }
    players = []

    updatePlayers = () => {
        var count = 0;
        var blank = new Array('8')
        // this.players = blank.map((curr, count) => {
        //     if (count < this.state.players.length) {
        //         return <PlayerCard username={this.state.players[count].name} />
        //     } else {
        //         return <PlayerCard username="BOGUS!" />
        //     }
        // });
        // while (count < 8) {
        //     if (count < this.state.players.length) {
        //         this.blank[count] = <PlayerCard username={this.state.players[count].name} />
        //     } else {
        //         this.blank[count] = <PlayerCard username="BOGUS!" />
        //     }
        //     count++;
        // }



        this.players = this.state.players.map(({ name }) => {
            // return <li>{ name }</li>;
            return <PlayerCard username={name} />
        });
        console.log(this.players)
        return this.players;
    }

    componentWillMount() {
        socket.emit("fetchPlayers");
        socket.on("updatePlayers", (newPlayers) => {
            this.setState({ players: newPlayers });
        });
    }

    render() {
        return (
            <div>
                <div className="head">{ this.props.game }</div>
                <div>{this.updatePlayers()}</div>
            </div>
        );
    };
}

export default PlayerLobby;