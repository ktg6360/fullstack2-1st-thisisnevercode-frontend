import React, { Component } from 'react';
import './BreadCrumb.scss';
import { convertToUrlForBreadCrumb } from '../../utils/urlConverter';

class BreadCrumb extends Component {
  render() {
    const { pathname } = this.props.location;
    const categoryName = convertToUrlForBreadCrumb(pathname);
    return (
      <div className='BreadCrumb'>
        <div className='categoryBox'>{categoryName}</div>
      </div>
    );
  }
}

export default BreadCrumb;
