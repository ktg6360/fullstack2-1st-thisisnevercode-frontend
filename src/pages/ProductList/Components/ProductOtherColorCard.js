import React, { Component } from 'react';
import './ProductOtherColorCard.scss';

class ProductOtherColorCard extends Component {
  render() {
    let { subImage, name, changeSubImage } = this.props;
    return (
      <div className='ProductOtherColorCard'>
        <img
          className='productSubImg'
          src={subImage}
          alt={name}
          onClick={changeSubImage}
        />
      </div>
    );
  }
}

export default ProductOtherColorCard;
