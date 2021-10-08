import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewOption.scss';

class ViewOption extends Component {
  onClick = event => {
    event.preventDefault();
    const { handleCheckIcon, id } = this.props;
    handleCheckIcon(id);
  };

  render() {
    const { isChecked, name } = this.props;
    return (
      <li className='viewOption classForViewClose'>
        <div className='checkBack classForViewClose' />
        <div
          onClick={this.onClick}
          id='idForViewClose'
          className={`checkIcon ${
            isChecked ? 'checkVisible' : 'checkInvisible'
          }`}
        />
        <Link className='classForViewClose' to='/' onClick={this.onClick}>
          {name}
        </Link>
      </li>
    );
  }
}
export default ViewOption;
