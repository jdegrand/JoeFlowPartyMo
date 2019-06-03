import React from 'react';
import Game from './components/Game';
import DrawTheThing from './components/DrawTheThing';
import './css/App.css';
import * as fconfig from './config';

import openSocket from 'socket.io-client';

const socket = openSocket("http://"+ fconfig.returnAddress() + ":3300");

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
        <Game name="Draw The Thing" startGame={this.startGameFunc} link="./hello.com"></Game>
        <Game name="Crazy MadLibs" startGame={this.startGameFunc} link="./hello.com"></Game>

      </div>
    );
    } else {
      return <DrawTheThing />;
    };
  };
}

export default App;
