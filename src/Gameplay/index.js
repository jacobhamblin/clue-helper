import React, { Component } from 'react';
import './Gameplay.css';

class Gameplay extends Component {
  state = this.props.state || {};
  returnToSetup = () => {
    this.props.reportState(this.state);
    this.props.returnToSetup();
  }
  render() {
    return (
      <div className='Game'>
        <div
          className='return'
          onClick={() => {this.returnToSetup()}}
        >
          Return to Setup
        </div>
      </div>
    );
  }
}

export default Gameplay;
