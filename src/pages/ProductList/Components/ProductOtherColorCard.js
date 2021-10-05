import React, { Component } from 'react';
import './ProductOtherColorCard.scss';

class ProductOtherColorCard extends Component {
  render() {
    let { subImage, name, changeSubImage } = this.props;
    return (
      <div className='ProductOtherColorCard'>
        <li className='productSubImgList'>
          <img
            className='productSubImg'
            src={subImage}
            alt={name}
            onClick={changeSubImage}
          />
        </li>
      </div>
    );
  }
}

export default ProductOtherColorCard;
