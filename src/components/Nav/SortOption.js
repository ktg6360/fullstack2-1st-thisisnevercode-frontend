import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SortOption.scss';

class SortOption extends Component {
  onClick = event => {
    event.preventDefault();
    const { handleSortCheckIcon, id } = this.props;
    handleSortCheckIcon(id);
  };

  render() {
    const { isChecked, name } = this.props;
    return (
      <li className='sortOption classForSortClose'>
        <div className='checkBackground classForSortClose' />
        <div
          onClick={this.onClick}
          id='idForSortClose'
          className={`checkIcon ${
            isChecked ? 'checkVisible' : 'checkInvisible'
          }`}
        />
        <Link className='classForSortClose' to={`/`} onClick={this.onClick}>
          {name}
        </Link>
      </li>
    );
  }
}
export default SortOption;
