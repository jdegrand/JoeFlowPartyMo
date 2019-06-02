import React from 'react';
import Game from './components/Game';
import './css/App.css';

import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:3300/");

class App extends React.Component {
  state = {started: false}; 
  startGameFunc = (name) => {
    socket.emit("startGame", name)
    this.setState({started: true});
  };
  render() {
    if (!this.state.started) {
    return (
      <div className="app" >
        <div className="title">
          JoeFlowPartyMo
        </div>
        <Game name="Who Drew It Better" startGame={this.startGameFunc} link="./hello.com"></Game>
        <Game name="Crazy MadLibs" startGame={this.startGameFunc} link="./hello.com"></Game>

      </div>
    );
    } else {
      return <div>Worked!</div>
    };
  };
}

export default App;
