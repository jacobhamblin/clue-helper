import React, { Component } from 'react';
import './Gameplay.css';
import Cell from './Cell';

class Gameplay extends Component {
  state = this.props.state;
  classicSuspects = [
    'Mr. Green',
    'Prof. Plum',
    'Col. Mustard',
    'Mrs. Peacock',
    'Miss Scarlet',
    'Mrs. White',
  ];
  MDSuspects = this.classicSuspects.concat([
    'Mme Rose',
    'Sgt. Gray',
    'M. Brunette',
    'Miss Peach',
  ]);
  classicWeapons = [
    'Candlestick',
    'Knife',
    'Lead Pipe',
    'Revolver',
    'Rope',
    'Wrench',
  ];
  MDWeapons = this.classicWeapons.concat(['Poison', 'Horseshoe']);
  classicRooms = [
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
  MDRooms = [
    'Courtyard',
    'Gazebo',
    'Drawing Room',
    'Dining Room',
    'Kitchen',
    'Carriage House',
    'Trophy Room',
    'Conservatory',
    'Studio',
    'Billiard Room',
    'Library',
    'Fountain',
  ];
  noteValues = [0, 1, 2, 3];
  returnToSetup = () => {
    this.props.reportState(this.state);
    this.props.returnToSetup();
  };
  updateValue = (playerID, label) => {
    const { tracking } = this.state;
    const newTracking = { ...tracking };

    newTracking[playerID][label] =
      (newTracking[playerID][label] + 1) % this.noteValues.length;
    this.setState({ tracking: newTracking });
  };
  populateRowsOfType(type) {
    const { tracking, version } = this.state;

    let rows = [];
    const sectionHeader = [<span className="header">{type}</span>].concat(
      new Array(this.state.players.length),
    );
    rows.push(
      <tr>
        {sectionHeader.map(el => (
          <td>{el}</td>
        ))}
      </tr>,
    );
    for (let i = 0; i < this[version + type].length; i++) {
      let row = [];
      const label = this[version + type][i];
      row.push(
        <td>
          <span>{label}</span>
        </td>,
      );
      for (let j = 0; j < this.state.players.length; j++) {
        const playerID = this.state.players[j].id;
        row.push(
          <Cell
            value={tracking[playerID][label]}
            updateValue={this.updateValue}
            playerID={playerID}
            label={label}
          />,
        );
      }
      rows.push(<tr>{row}</tr>);
    }
    return <>{rows}</>;
  }
  populateBody() {
    const rowScaffolding = ['Suspects', 'Weapons', 'Rooms'];
    return <>{rowScaffolding.map(row => this.populateRowsOfType(row))}</>;
  }
  toggleVersion() {
    const version = this.state.version === 'MD' ? 'classic' : 'MD';
    this.setState({ version });
  }
  render() {
    const { players, version } = this.state;
    const playerNames = players.map(player => player.name);
    const active = version === 'MD' ? 'active' : '';
    return (
      <div className="Game offset-md-3 col-md-6 col-xs-12">
        <div className="top-row">
          <div
            className={`master-detective ${active}`}
            onClick={() => {
              this.toggleVersion();
            }}>
            MD
          </div>
          <div
            className="return"
            onClick={() => {
              this.returnToSetup();
            }}>
            Setup
          </div>
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
