import React, { Component } from 'react';
import './Setup.css';

class Setup extends Component {
  state = this.props.state || {
    id: 0,
    newPlayerName: '',
    players: [],
    play: false,
  };
  enterGame = () => {
    this.props.reportState(this.state);
    this.props.enterGame();
  };
  removePlayer = id => {
    const { players } = this.state;
    this.setState({ players: players.filter(player => player.id !== id) });
  };
  getPlayersList = () => {
    return (
      <ul className="players-list">
        {this.state.players.map(player => {
          return (
            <li>
              <span>{player.name}</span>
              <button
                onClick={() => {
                  this.removePlayer(player.id);
                }}>
                x
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
  submitPlayer = () => {
    const { id, newPlayerName, players } = this.state;
    this.setState({
      players: [...players, { id, name: newPlayerName }],
      newPlayerName: '',
      id: id + 1,
    });
  };
  render() {
    return (
      <div className="Setup offset-md-3 col-md-6 col-xs-12">
        <div className="new-player">
          <input
            className="player-name"
            placeholder="player name"
            onChange={e => this.setState({ newPlayerName: e.target.value })}
            onKeyPress={e => {
              if (e.key === 'Enter') this.submitPlayer();
            }}
            value={this.state.newPlayerName}
          />
          <button
            className="new-player-submit"
            onClick={() => this.submitPlayer()}>
            Save Player
          </button>
        </div>
        {this.getPlayersList()}
        <div className="play" onClick={() => this.enterGame()}>
          Play
        </div>
      </div>
    );
  }
}

export default Setup;
