import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './vendor/bootstrap-grid.min.css';
import Setup from './Setup';
import Game from './Gameplay';

class App extends Component {
  state = this.props.state || {
    game: { version: 'classic' },
    play: false,
    setup: undefined,
  };
  updateSetupState = state => {
    const tracking = (this.state.game && this.state.game.tracking) || {};
    state.players.forEach(player => {
      tracking[player.id] = tracking[player.id] || new Array(39).fill(0);
    });
    const game = { ...this.state.game, players: state.players, tracking };
    this.setState({ setup: state, game });
  };
  updateGameState = state => this.setState({ game: state });
  toggleGameState = () => this.setState({ play: !this.state.play });
  render() {
    const { game, play, setup } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {play ? (
            <Game
              state={game}
              reportState={this.updateGameState}
              returnToSetup={this.toggleGameState}
            />
          ) : (
            <Setup
              state={setup}
              reportState={this.updateSetupState}
              enterGame={this.toggleGameState}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
