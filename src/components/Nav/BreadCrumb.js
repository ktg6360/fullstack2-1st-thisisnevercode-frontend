import React, { Component } from 'react';
import './BreadCrumb.scss';

class BreadCrumb extends Component {
  render() {
    const { pathname } = this.props.location;
    const splitted = pathname.split('');
    splitted.shift();
    splitted[0] = splitted[0].toUpperCase();
    const categoryName = splitted.join('');
    return (
      <div className='BreadCrumb'>
        <div className='categoryBox'>{categoryName}</div>
      </div>
    );
  }
}

export default BreadCrumb;
