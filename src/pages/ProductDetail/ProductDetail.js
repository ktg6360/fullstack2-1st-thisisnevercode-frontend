import React, { Component } from 'react';
import './ProductDetail.scss';
import { PRODUCT_DETAIL } from './ProductDetailData';
import { IMAGE_URL } from './images';
import PaginationBox from './PaginationBox';
import ProductImgSlide from './ProductImgSlide';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      imageCurrentNo: 0,
      images: [],
    };
  }

  onChangeImage = index => {
    if (this.state.images.length <= index) index = 0;
    if (index < 0) index = this.state.images.length - 1;
    this.setState({ imageCurrentNo: index });
  };

  componentDidMount() {
    this.setState({ images: IMAGE_URL });
  }

  render() {
    const images = this.state.images;
    return (
      <section className='productDetail'>
        <figure>
          <PaginationBox img={images} onChangeImage={this.onChangeImage} />
        </figure>

        <article>
          <ProductImgSlide
            img={images}
            imgNo={this.state.imageCurrentNo}
            onChangeImage={this.onChangeImage}
          />
        </article>

        <aside>
          <h1 className='name'>{PRODUCT_DETAIL[0].name}</h1>
          <div className='price'>{PRODUCT_DETAIL[0].price}</div>
          <div className='box'></div>
          <p className='description'>{PRODUCT_DETAIL[0].description}</p>
          <p className='textileInformation'>{PRODUCT_DETAIL[0].textileInfo}</p>
        </aside>
      </section>
    );
  }
}

export default ProductDetail;
