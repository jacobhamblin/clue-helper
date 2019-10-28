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
  customSuspects = [];
  customWeapons = [];
  customRooms = [];
  newAssetModal = type => {
    this.setState({ editingAnAsset: type });
  };
  removeAssetModal = (type, label) => {
    this.setState({ removeAssetType: type, removeAssetLabel: label });
  };
  removeAsset = () => {
    const type = this.state.removeAssetType;
    const label = this.state.removeAssetLabel;
    const lists = [
      this['classic' + type],
      this['MD' + type],
      this['custom' + type],
    ];
    ['classic', 'MD', 'custom'].forEach(prefix => {
      this[prefix + type] = this[prefix + type].filter(
        value => value !== label,
      );
    });
    this.setState({
      removeAssetType: '',
      removeAssetLabel: '',
    });
  };
  noteValues = [0, 1, 2, 3, 4];
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
    const sectionHeader = [
      <>
        <div
          className="addNew"
          onClick={() => {
            this.newAssetModal(type);
          }}>
          +
        </div>
        <span className="header">{type}</span>
      </>,
    ].concat(new Array(this.state.players.length));
    rows.push(
      <tr>
        {sectionHeader.map(el => (
          <td className="sectionHeader">{el}</td>
        ))}
      </tr>,
    );
    const assets = this[version + type].concat(this['custom' + type]);
    for (let i = 0; i < assets.length; i++) {
      let row = [];
      const label = assets[i];
      row.push(
        <td>
          <div className="assetContainer">
            <div
              className="removeAsset"
              onClick={() => {
                this.removeAssetModal(type, label);
              }}>
              x
            </div>
            <span>{label}</span>
          </div>
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
  submitNewAsset = () => {
    this['custom' + this.state.editingAnAsset] = this[
      'custom' + this.state.editingAnAsset
    ].concat([this.state.newAsset]);
    this.setState({
      editingAnAsset: false,
      newAsset: '',
    });
  };
  toggleVersion() {
    const version = this.state.version === 'MD' ? 'classic' : 'MD';
    this.setState({ version });
  }
  render() {
    const { players, version } = this.state;
    const playerNames = players.map(player => player.name);
    const MDActive = version === 'MD' ? 'active' : '';
    const modalActive =
      this.state.editingAnAsset || this.state.removeAssetLabel ? 'active' : '';
    const editingAsset =
      this.state.editingAnAsset &&
      this.state.editingAnAsset.substr(0, this.state.editingAnAsset.length - 1);
    const newAssetVisible = this.state.editingAnAsset ? 'active' : '';
    const removeAssetVisible = this.state.removeAssetLabel ? 'active' : '';
    const removeAsset =
      this.state.removeAssetType &&
      this.state.removeAssetType.substr(
        0,
        this.state.removeAssetType.length - 1,
      );
    return (
      <div className="Game offset-md-3 col-md-6 col-xs-12">
        <div className="top-row">
          <div
            className={`master-detective ${MDActive}`}
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
        <div
          className={`modalBackground ${modalActive}`}
          onClick={e => {
            if (!this.modalContents.contains(e.target)) {
              this.setState({
                editingAnAsset: false,
                removeAssetLabel: '',
                removeAssetType: '',
              });
            }
          }}>
          <div
            className="modalContents"
            ref={node => (this.modalContents = node)}>
            <div className={`newAsset ${newAssetVisible}`}>
              <h4>{`Add new ${editingAsset}`}</h4>
              <div className="inputContainer">
                <input
                  type="text"
                  onChange={e => {
                    this.setState({ newAsset: e.target.value });
                  }}
                  value={this.state.newAsset}
                  onKeyPress={e => {
                    if (e.key === 'Enter') this.submitNewAsset();
                  }}
                />
                <div className="submit" onClick={this.submitNewAsset}>
                  OK
                </div>
              </div>
            </div>
            <div className={`removeAsset ${removeAssetVisible}`}>
              <h4>{`Remove ${removeAsset} ${this.state.removeAssetLabel}`}</h4>
              <div className="inputContainer">
                <div className="submit" onClick={this.removeAsset}>
                  Yes
                </div>
                <div
                  className="submit"
                  onClick={() => {
                    this.setState({
                      removeAssetLabel: '',
                      removeAssetType: '',
                    });
                  }}>
                  No
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gameplay;
