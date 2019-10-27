import React, { Component } from 'react';
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
  handler = {
    get: (target, name) => {
      return target.hasOwnProperty(name) ? target[name] : 0;
    }
  };
  updateSetupState = state => {
    const tracking = (this.state.game && this.state.game.tracking) || {};
    state.players.forEach(player => {
      tracking[player.id] = tracking[player.id] || new Proxy({}, this.handler);
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
