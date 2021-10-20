import React, { Component } from 'react';
import PaginationBox from './Components/PaginationBox';
import ProductImgSlide from './Components/ProductImgSlide';
import ProductInfo from './Components/ProductInfo';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import './ProductDetail.scss';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      imageCurrentNo: 0,
      product: null,
    };
  }

  onChangeImage = index => {
    if (this.state.product.detailImg.length <= index) index = 0;
    if (index < 0) index = this.state.product.detailImg.length - 1;
    this.setState({ imageCurrentNo: index });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/product/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res });
      });
  }

  render() {
    const productInfo = this.state.product;

    return productInfo == null ? null : (
      <section className='ProductDetail'>
        <Nav productInfo={productInfo} />
        <figure className='subImgBox'>
          <PaginationBox
            productInfo={productInfo}
            onChangeImage={this.onChangeImage}
          />
        </figure>
        <article className='mainImgBox'>
          <ProductImgSlide
            productInfo={productInfo}
            imgNo={this.state.imageCurrentNo}
            onChangeImage={this.onChangeImage}
          />
        </article>
        <aside className='productInfoBox'>
          <ProductInfo
            productInfo={productInfo}
            imgNo={this.state.imageCurrentNo}
          />
        </aside>
        <Footer />
      </section>
    );
  }
}

export default ProductDetail;
