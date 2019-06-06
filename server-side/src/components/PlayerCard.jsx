import React from 'react';
import '../css/Player.css';

class PlayerCard extends React.Component {
    render() {
        return (
            <div className="player-card" style={ this.props.style }>{ this.props.username }</div>
        );
    };
}

export default PlayerCard;