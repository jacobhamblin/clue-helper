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
      <div className='Game offset-md-3 col-md-6 col-xs-12'>
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
