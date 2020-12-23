import React, { Component } from "react";
import _debounce from "lodash/debounce";
import "./App.css";
import "./vendor/bootstrap-grid.min.css";
import Setup from "./Setup";
import Game from "./Gameplay";

export const STORAGE_KEY = "CLUE_STATE";
export const INITIAL_STATE = {
  game: { version: "classic" },
  play: false,
  setup: undefined,
};

class App extends Component {
  state = this.props.state || {
    game: { version: "classic" },
    play: false,
    setup: undefined,
  };
  componentDidMount() {
    let existingState = localStorage.getItem(STORAGE_KEY);
    if (existingState) {
      try {
        existingState = JSON.parse(existingState);
      } catch (e) {
        return;
      }
      const keys = Object.keys(existingState);
      if (keys && keys.length) this.setState(existingState);
    }
  }
  resetAllState = () => {
    localStorage.setItem(STORAGE_KEY, "");
    this.setState(INITIAL_STATE);
  };
  updateSetupState = (state) => {
    const tracking = (this.state.game && this.state.game.tracking) || {};
    state.players.forEach((player) => {
      tracking[player.id] = tracking[player.id] || {};
    });
    const game = { ...this.state.game, players: state.players, tracking };
    this.setState({ setup: state, game }, this.updateStorage);
  };
  updateGameState = (state) =>
    this.setState({ game: state }, this.updateStorage);
  updateStorage = _debounce(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }, 500);
  toggleGameState = () =>
    this.setState({ play: !this.state.play }, this.updateStorage);
  render() {
    const { game, play, setup } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {play ? (
            <Game
              state={game}
              reportState={this.updateGameState}
              resetState={this.resetAllState}
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
