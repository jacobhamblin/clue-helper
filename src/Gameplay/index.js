import React, { Component } from 'react';
import './Gameplay.css';

class Gameplay extends Component {
  state = this.props.state || {};
  suspects = ['Mr. Green', 'Prof. Plum', 'Col. Mustard', 'Mrs. White', 'Miss Scarlet', 'Mrs. White'];
  weapons = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
  rooms = ['Conservatory', 'Lounge', 'Kitchen', 'Library', 'Hall', 'Study', 'Ballroom', 'Dining Room', 'Billiard Room'];
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
  render() {
    return (
      <div className='Game offset-md-3 col-md-6 col-xs-12'>
        <div
          className='return'
          onClick={() => {this.returnToSetup()}}
        >
          Return to Setup
        </div>
        <div className='tracker'>
          {this.gameElements()}
        </div>
      </div>
    );
  }
}

export default Gameplay;
