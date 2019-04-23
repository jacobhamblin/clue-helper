import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Setup from './Setup';

class App extends Component () {
  state = { game: undefined, play: false, setup: undefined }
  updateSetupState = (state) => this.setState({setup: state})
  updateGameState = (state) => this.setState({game: state})
  render() {
    const { game, play, setup } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Setup state={setup} reportState={this.updateSetupState} />
          <Setup state={game} reportState={this.updateGameState} />
        </header>
      </div>
    );
  }
}

export default App;
