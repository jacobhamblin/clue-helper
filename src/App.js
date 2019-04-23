import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Setup from './Setup';
import Game from './Gameplay';

class App extends Component() {
  state = { game: undefined, play: false, setup: undefined };
  updateSetupState = state => this.setState({ setup: state });
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
              enterGame={this.toggleGameState}
            />
          ) : (
            <Setup
              state={setup}
              reportState={this.updateSetupState}
              returnToSetup={this.toggleGameState}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
