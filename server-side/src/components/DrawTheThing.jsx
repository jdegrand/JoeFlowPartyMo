import React from 'react';

class DrawTheThing extends React.Component {
    state = { started: false, players: [{name: "JoeySoFlowey"}, {name: "FrancoDeSnako"}] }
    
    players = this.state.players.map(({ name }) => {
        return <li>{ name }</li>;
    });

    render() {
        return (
            <div>{this.players}</div>
        );
    };
}

export default DrawTheThing;