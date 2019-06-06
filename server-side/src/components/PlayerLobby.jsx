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
        var playerList = new Array('8')
        while (count < 8) {
            if (count < this.state.players.length) {
                playerList[count] = <PlayerCard username={ this.state.players[count].name} style={{}} />
            } else {
                playerList[count] = <PlayerCard username="Empty" style={{ color: 'grey', fontSize: '2.5vw'}} />
            }
            count++;
        }
        return playerList;
    }

    onStartClick = () => {
        if (this.state.players.length < 2) {
            // return false;
        } else {
            this.setState({started: true})
        }
    }

    getButtonColor = () => {
        if (this.state.players.length < 2) {
            return "grey"
        } else {
            return "purple"
        }
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
                <div className="head">
                    <div className="sub-head">
                        { this.props.game }
                    </div>
                    <div className="sub-head" style={{fontSize: '2.5vw'}}>
                        Current Players:
                    </div>
                    <div className="start" style={{ backgroundColor: this.getButtonColor() }} onClick={ this.onStartClick }>
                        Start
                    </div>
                </div>
                <div>{this.updatePlayers()}</div>
            </div>
        );
    };
}

export default PlayerLobby;