import React, { Component } from 'react';
import { convertToUrlForBreadCrumb } from '../../utils/urlConverter';
import './BreadCrumb.scss';

class BreadCrumb extends Component {
  render() {
    const { pathname } = this.props.location;
    const categoryName = convertToUrlForBreadCrumb(pathname);
    return (
      <div className='BreadCrumb'>
        <div
          className={`categoryBox ${
            this.props.productInfo && 'changeColorGray'
          }`}
        >
          {categoryName}
        </div>
        {this.props.productInfo && (
          <div className='productNameBox'>{this.props.productInfo.name}</div>
        )}
      </div>
    );
  }
}

export default BreadCrumb;
