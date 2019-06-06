import React from 'react';
import Game from './components/Game';
import PlayerLobby from './components/PlayerLobby';
import './css/App.css';
import * as fconfig from './config';

import openSocket from 'socket.io-client';

const socket = openSocket("http://"+ fconfig.returnAddress() + ":3300");

class App extends React.Component {
  state = {chosen: false, game: ''}; 
  startGameFunc = (name) => {
    socket.emit("choseGame", name)
    this.setState({chosen: true, game: name});
  };

  componentWillMount() {
    socket.emit("returnGameIfChosen");
    socket.on("returnGameAndChosen", (chosen, game) => {
        if(chosen) {
          this.setState({ chosen: true, game: game });
        }
    });
  }
  
  render() {
    if (!this.state.chosen) {
    return (
      <div className="app" >
        <div className="title">
          JoeFlowPartyMo
        </div>
        <Game name="Draw The Thing" startGame={this.startGameFunc} link="./hello.com"></Game>
        <Game name="Crazy MadLibs" startGame={this.startGameFunc} link="./hello.com"></Game>

      </div>
    );
    } else {
      return <PlayerLobby game={ this.state.game } />;
    };
  };
}

export default App;
