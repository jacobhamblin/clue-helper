import React, { Component } from 'react';
import _debounce from "lodash/debounce";
import './App.css';
import './vendor/bootstrap-grid.min.css';
import Setup from './Setup';
import Game from './Gameplay';

const STORAGE_KEY = 'CLUE_STATE';

class App extends Component {
  state = this.props.state || {
    game: { version: 'classic' },
    play: false,
    setup: undefined,
  };
  componentDidMount() {
    const existingState = localStorage.getItem(STORAGE_KEY);
    if (existingState) this.setState(JSON.parse(existingState));
  }
  updateSetupState = state => {
    const tracking = (this.state.game && this.state.game.tracking) || {};
    state.players.forEach(player => {
      tracking[player.id] = tracking[player.id] || {};
    });
    const game = { ...this.state.game, players: state.players, tracking };
    this.setState({ setup: state, game }, this.updateStorage);
  };
  updateGameState = state => this.setState({ game: state }, this.updateStorage);
  updateStorage = _debounce(() => {
    console.log('calling update storage, heres the state')
    console.log(this.state)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
  }, 500);
  toggleGameState = () => this.setState({ play: !this.state.play }, this.updateStorage);
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
