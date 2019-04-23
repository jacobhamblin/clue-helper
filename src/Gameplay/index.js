import React, { Component } from 'react';
import './Gameplay.css';
import Cell from './Cell';

class Gameplay extends Component {
  state = this.props.state;
  suspects = [
    'Mr. Green',
    'Prof. Plum',
    'Col. Mustard',
    'Mrs. White',
    'Miss Scarlet',
    'Mrs. White',
  ];
  weapons = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
  rooms = [
    'Conservatory',
    'Lounge',
    'Kitchen',
    'Library',
    'Hall',
    'Study',
    'Ballroom',
    'Dining Room',
    'Billiard Room',
  ];
  noteValues = [0, 1, 2, 3];
  returnToSetup = () => {
    this.props.reportState(this.state);
    this.props.returnToSetup();
  };
  updateValue = (playerID, index) => {
    const { tracking } = this.state;
    const newTracking = { ...tracking };

    newTracking[playerID][index] =
      (newTracking[playerID][index] + 1) % this.noteValues.length;
    this.setState({ tracking: newTracking });
  };
  populateRowsOfType({ offset, type }) {
    const { tracking } = this.state;
    let rows = [];
    const sectionHeader = [
      <span className="header">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>,
    ].concat(new Array(this.state.players.length));
    rows.push(
      <tr>
        {sectionHeader.map(el => (
          <td>{el}</td>
        ))}
      </tr>,
    );
    for (let i = 0; i < this[type].length; i++) {
      let row = [];
      row.push(
        <td>
          <span>{this[type][i]}</span>
        </td>,
      );
      for (let j = 0; j < this.state.players.length; j++) {
        console.log(i + offset);
        row.push(
          <Cell
            value={tracking[j][i + offset]}
            updateValue={this.updateValue}
            playerID={j}
            index={i + offset}
          />,
        );
      }
      rows.push(<tr>{row}</tr>);
    }
    return <>{rows}</>;
  }
  populateBody() {
    const rowScaffolding = [
      { offset: 0, type: 'suspects' },
      { offset: this.suspects.length, type: 'weapons' },
      { offset: this.suspects.length + this.weapons.length, type: 'rooms' },
    ];
    return <>{rowScaffolding.map(row => this.populateRowsOfType(row))}</>;
  }
  render() {
    const playerNames = this.state.players.map(player => player.name);
    return (
      <div className="Game offset-md-3 col-md-6 col-xs-12">
        <div
          className="return"
          onClick={() => {
            this.returnToSetup();
          }}>
          Return to Setup
        </div>
        <table className="tracker">
          <tbody>
            <tr>
              {[''].concat(playerNames).map(val => (
                <td>{val}</td>
              ))}
            </tr>
            {this.populateBody()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Gameplay;
