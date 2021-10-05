import React, { Component } from 'react';
import './ProductDetailCard.scss';

class ProductDetailCard extends Component {
  render() {
    let { detailImage } = this.props;

    return (
      <div
        className='ProductDetailCard'
        style={{
          backgroundImage: `url(${detailImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      ></div>
    );
  }
}

export default ProductDetailCard;
