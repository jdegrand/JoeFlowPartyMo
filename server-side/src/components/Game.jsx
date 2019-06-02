import React from 'react';
import '../css/Game.css';

class Game extends React.Component {
    onNameClick = (event) => {
        event.preventDefault();
        this.props.startGame(this.props.name);
    };
    
    render() {
        return (
            <div className="container" onClick={ this.onNameClick }>{this.props.name}</div>
        );
    };
}

export default Game;