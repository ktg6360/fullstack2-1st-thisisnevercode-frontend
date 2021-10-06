import React, { Component } from 'react';
import './ProductDetail.scss';
import PaginationBox from './PaginationBox';
import ProductImgSlide from './ProductImgSlide';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      imageCurrentNo: 0,
      product: null,
    };
  }

  onChangeImage = index => {
    if (this.state.product.subImg.length <= index) index = 0;
    if (index < 0) index = this.state.product.subImg.length - 1;
    this.setState({ imageCurrentNo: index });
  };

  componentDidMount() {
    fetch('/data/ProductDetail/ProductDetail.json')
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res.products[0] });
      });
  }

  render() {
    const productInfo = this.state.product;
    return productInfo == null ? null : (
      <section className='ProductDetail'>
        <figure>
          <PaginationBox
            productInfo={productInfo}
            onChangeImage={this.onChangeImage}
          />
        </figure>

        <article>
          <ProductImgSlide
            productInfo={productInfo}
            imgNo={this.state.imageCurrentNo}
            onChangeImage={this.onChangeImage}
          />
        </article>

        <aside>
          <h1 className='name'>{productInfo.name}</h1>
          <div className='price'>{productInfo.price}</div>
          <div className='box'></div>
          <p className='description'>{productInfo.description}</p>
          <p className='textileInformation'>{productInfo.textileInfo}</p>
        </aside>
      </section>
    );
  }
}

export default ProductDetail;
