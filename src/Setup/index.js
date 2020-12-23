import React, { Component } from "react";
import "./Setup.css";

class Setup extends Component {
  reportState = this.props.reportState;
  state = this.props.state || {
    id: 0,
    newPlayerName: "",
    players: [],
    play: false,
  };
  enterGame = () => {
    this.reportState(this.state);
    this.props.enterGame();
  };
  removePlayer = (id) => {
    const { players } = this.state;
    const newState = {
      ...this.state,
      players: players.filter((player) => player.id !== id),
    };
    this.setState(newState, this.reportState(newState));
  };
  getPlayersList = () => {
    return (
      <ul className="players-list">
        {this.state.players.map((player) => {
          return (
            <li>
              <span>{player.name}</span>
              <button
                onClick={() => {
                  this.removePlayer(player.id);
                }}
              >
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
    const newState = {
      ...this.state,
      players: [...players, { id, name: newPlayerName }],
      newPlayerName: "",
      id: id + 1,
    };
    this.setState(newState, this.reportState(newState));
  };
  render() {
    const play = this.state.players.length ? (
      <div className="play" onClick={() => this.enterGame()}>
        Play
      </div>
    ) : (
      <div className="play disabled">Play</div>
    );

    return (
      <div className="Setup offset-md-3 col-md-6 col-xs-12">
        <div className="new-player">
          <input
            className="player-name"
            placeholder="player name"
            onChange={(e) => {
              const newState = {
                ...this.state,
                newPlayerName: e.target.value,
              };
              this.setState(newState, this.reportState(newState));
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") this.submitPlayer();
            }}
            value={this.state.newPlayerName}
          />
          <button
            className="new-player-submit"
            onClick={() => this.submitPlayer()}
          >
            Save Player
          </button>
        </div>
        {this.getPlayersList()}
        {play}
      </div>
    );
  }
}

export default Setup;
