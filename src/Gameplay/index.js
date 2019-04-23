import React, { Component } from 'react';
import './Gameplay.css';

class Gameplay extends Component {
  state = this.props.state;
  suspects = ['Mr. Green', 'Prof. Plum', 'Col. Mustard', 'Mrs. White', 'Miss Scarlet', 'Mrs. White'];
  weapons = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
  rooms = ['Conservatory', 'Lounge', 'Kitchen', 'Library', 'Hall', 'Study', 'Ballroom', 'Dining Room', 'Billiard Room'];
  noteValues = [0, 1, 2, 3];
  returnToSetup = () => {
    this.props.reportState(this.state);
    this.props.returnToSetup();
  }
  gameElements = () => {
    return (
      <div className='game-elements'>
        <span className='header'>Suspects</span>
        {this.suspects.map(suspect => <span>{suspect}</span>)}
        <span className='header'>Weapons</span>
        {this.weapons.map(weapon => <span>{weapon}</span>)}
        <span className='header'>Rooms</span>
        {this.rooms.map(room => <span>{room}</span>)}
      </div>
    )
  }
  renderPlayer(player) {
    return <span>{player.name}</span>
  }
  renderPlayers() {
    return (
      <div className='players'>
        {this.state.players.map(player => this.renderPlayer(player))}
      </div>
    )
  }
  updateValue = (playerID, index) => {
    const { tracking } = this.state;
    const newTracking = {...tracking};
    newTracking[playerID][index] = (newTracking[playerID][index] + 1) % this.noteValues.length;
    this.setState({tracking: newTracking});
  }
  populateRowsOfType({offset, type}) {
    let rows = [];
    rows.push([<span className='header'>{type.charAt(0).toUpperCase() + type.slice(1)}</span>].concat(new Array(this.state.players.length)));
    for (let i = 0; i < this[type].length; i++) {
      let row = [];
      row.push(<span>{this[type][i]}</span>);
      for (let j = 0; j < this.state.players.length; j++) {
        row.push(<div>cell</div>);
      } 
      rows.push(row);
    }
    return (
      <>
        {rows}
      </>
    );
  }
  populateBody() {
    const rowScaffolding = [{offset: 0, type: 'suspects'}, {offset: this.suspects.length, type: 'weapons'}, {offset: this.suspects.length + this.weapons.length, type: 'rooms'}];
    return (
      <tbody>
        {rowScaffolding.map(row => this.populateRowsOfType(row))}
      </tbody>
    );
  }
  render() {
    const playerNames = this.state.players.map(player => player.name);
    return (
      <div className='Game offset-md-3 col-md-6 col-xs-12'>
        <div
          className='return'
          onClick={() => {this.returnToSetup()}}
        >
          Return to Setup
        </div>
        <table className='tracker'>
          <thead>
            {[''].concat(playerNames).map(val => <td>{val}</td>)}
          </thead>
          {this.populateBody()}
        </table>
      </div>
    );
  }
}

export default Gameplay;
