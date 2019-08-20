import React, { Component } from 'react';
import './Gameplay.css';
import Cell from './Cell';

class Gameplay extends Component {
  state = this.props.state;
  classicSuspects = [
    ['Mr. Green', 0],
    ['Prof. Plum', 1],
    ['Col. Mustard', 2],
    ['Mrs. Peacock', 3],
    ['Miss Scarlet', 4],
    ['Mrs. White', 5],
  ];
  MDSuspects = this.classicSuspects.concat([
    ['Mme Rose', 6],
    ['Sgt. Gray', 7],
    ['M. Brunette', 8],
    ['Miss Peach', 9],
  ]);
  classicWeapons = [
    ['Candlestick', 10],
    ['Knife', 11],
    ['Lead Pipe', 12],
    ['Revolver', 13],
    ['Rope', 14],
    ['Wrench', 15],
  ];
  MDWeapons = this.classicWeapons.concat([['Poison', 16], ['Horseshoe', 17]]);
  classicRooms = [
    ['Conservatory', 18],
    ['Lounge', 19],
    ['Kitchen', 20],
    ['Library', 21],
    ['Hall', 22],
    ['Study', 23],
    ['Ballroom', 24],
    ['Dining Room', 25],
    ['Billiard Room', 26],
  ];
  MDRooms = [
    ['Courtyard', 27],
    ['Gazebo', 28],
    ['Drawing Room', 29],
    ['Dining Room', 30],
    ['Kitchen', 31],
    ['Carriage House', 32],
    ['Trophy Room', 33],
    ['Conservatory', 34],
    ['Studio', 35],
    ['Billiard Room', 36],
    ['Library', 37],
    ['Fountain', 38],
  ];
  noteValues = [0, 1, 2, 3];
  returnToSetup = () => {
    this.props.reportState(this.state);
    this.props.returnToSetup();
  };
  updateValue = (playerID, memoryPos) => {
    const { tracking } = this.state;
    const newTracking = { ...tracking };

    newTracking[playerID][memoryPos] =
      (newTracking[playerID][memoryPos] + 1) % this.noteValues.length;
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
      const label = this[version + type][i][0];
      const memoryPos = this[version + type][i][1];
      row.push(
        <td>
          <span>{label}</span>
        </td>,
      );
      for (let j = 0; j < this.state.players.length; j++) {
        const playerID = this.state.players[j].id;
        row.push(
          <Cell
            playerOrder={j}
            value={tracking[playerID][memoryPos]}
            updateValue={this.updateValue}
            playerID={playerID}
            memoryPos={memoryPos}
          />,
        );
      }
      rows.push(<tr>{row}</tr>);
    }
    return <>{rows}</>;
  }
  populateBody() {
    const { version } = this.state;
    const rowScaffolding = ['Suspects', 'Weapons', 'Rooms'];
    return <>{rowScaffolding.map(row => this.populateRowsOfType(row))}</>;
  }
  toggleVersion() {
    const version = this.state.version == 'MD' ? 'classic' : 'MD';
    this.setState({ version });
  }
  render() {
    const { players, version } = this.state;
    const playerNames = players.map(player => player.name);
    const active = version == 'MD' ? 'active' : '';
    return (
      <div className="Game offset-md-3 col-md-6 col-xs-12">
        <div
          className="return"
          onClick={() => {
            this.returnToSetup();
          }}>
          Setup
        </div>
        <div
          className={`master-detective ${active}`}
          onClick={() => {
            this.toggleVersion();
          }}>
          MD
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
