import React from 'react';
import '../css/Player.css';

class PlayerCard extends React.Component {
    render() {
        return (
            <div className="player-card">{ this.props.username }</div>
        );
    };
}

export default PlayerCard;