import React, { Component } from 'react';
import './Setup.css';

class Setup extends Component {
  state = {newPlayerName: '', players: [], play: false} || this.props.state;
  enterGame = () => {
    this.props.reportState(this.state);
    console.log(this.props)
    console.log(this.props.enterGame)
    this.props.enterGame();
  }
  getPlayersList = () => {
    return (
      <ul className='players-list'>
        {this.state.players.map(player => <li>{player}</li>)}
      </ul>
    );
  }
  submitPlayer = () => {
    const { newPlayerName, players } = this.state;
    this.setState({players: [...players, newPlayerName], newPlayerName: ''})
  }
  render() {
    return (
      <div className='Setup'>
        <div className='new-player'>
          <input
            placeholder='player name'
            onChange={e => this.setState({newPlayerName: e.target.value})}
            onKeyPress={e => {if (e.key === 'Enter') this.submitPlayer()}}
            value={this.state.newPlayerName}
          />
          <button
            className='new-player-submit'
            onClick={() => this.submitPlayer()}
          >
            Save Player
          </button>
        </div>
        {this.getPlayersList()}
        <div
          className='play'
          onClick={() => this.enterGame()}
        >
          Play   
        </div>
      </div>
    )
  }
}

export default Setup;
