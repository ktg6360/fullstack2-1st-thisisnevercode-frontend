import { Component } from 'react';
import './ProductInfo.scss';
class ProductInfo extends Component {
  render() {
    const { name, price, description, textileInfo } = this.props.productInfo;

    return (
      <div className='ProductInfo'>
        <div>
          <h1 className='name'>{name}</h1>
          <p className='price'>{price}</p>
          <div className='addBox'>
            <button className='addToCartBtn'>ADD TO CART</button>
            <p className='addToWishList'>
              ADD TO
              <br />
              WISHLIST
            </p>
          </div>
          <p className='description'>{description}</p>
          <p className='textileInformation'>{textileInfo}</p>
        </div>
      </div>
    );
  }
}

export default ProductInfo;
