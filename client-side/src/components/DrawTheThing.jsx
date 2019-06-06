import React from 'react';
import NewPlayer from './NewPlayer';

class DrawTheThing extends React.Component {
    state = { loggedIn: false, username: '' }

    isLoggedIn = () => {
        return this.state.loggedIn
    }

    login = (name) => {
        this.setState({ loggedIn: true, username: name });
    }

    renderGame() {
        if (!this.state.loggedIn) {
            return (
                <NewPlayer isLoggedIn={ this.isLoggedIn() } login={this.login}/>
            );
        } else {
            return (
                <div>Welcome { this.state.username }!!</div>
            );
        }
    }

    render() {
        return this.renderGame();
    };
}

export default DrawTheThing;