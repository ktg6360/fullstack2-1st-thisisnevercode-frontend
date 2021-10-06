import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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
      <li className='viewOption'>
        <div className='checkBack' />
        <FontAwesomeIcon
          onClick={this.onClick}
          icon={faCheck}
          className={`checkIcon ${
            isChecked ? 'checkVisible' : 'checkInvisible'
          }`}
        />
        <Link to='/' onClick={this.onClick}>
          {name}
        </Link>
      </li>
    );
  }
}
export default ViewOption;
