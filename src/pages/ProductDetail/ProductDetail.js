import React, { Component } from 'react';
import './ProductDetail.scss';
import { PRODUCT_DETAIL } from './ProductDetailData';
import { PRODUCT_TEXTILE } from './ProductTextileData';
// import { IMAGE_URL } from './images';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      imageCurrentNo: 0,
    };
  }

  onChangeImage = index => {
    if (this.props.images.length <= index) index = 0;
    if (index < 0) index = this.props.images.length - 1;

    this.setState({ imageCurrentNo: index });
  };

  render() {
    // const { images } = this.props;
    return (
      <section className='productDetail'>
        <figure>
          <p className='description'>
            T.N.T Classic HDP Series' is the most basic high-quality sweatshirt
            in thisisneverthat. Consiting of zip-up hooded sweatshirt, hooded
            sweatshirt, crewneck sweatshirt, sweatpants, this series was created
            each in six colors.
          </p>
          <p className='textileInformation'>
            Fabric developed by thisisneverthat Fluffy lining Classic label
            embroidery on chest Cotton 100% Made in China
          </p>
        </figure>

        <article>
          {/* <div className='imageSlide'>
            <div className='navBox'>
              <span>{this.state.imageCurrentNo + 1}</span>
              <span>/</span>
              <span>{images && images.length}</span>
            </div>
            <div className='slideBox'>
              <div
                className='slideList'
                style={{
                  transform: `translate3d(
                ${this.state.imageCurrentNo * -500}px, 0px, 0px`,
                }}
              >
                {images?.map((image, no) => (
                  <div className='slideContent' key={no}>
                    <picture>
                      <img src={IMAGE_URL.img_url1} alt={IMAGE_URL.alt} />
                    </picture>
                  </div>
                ))}
              </div>

              <div
                className='buttonPrev'
                onClick={() =>
                  this.onChangeImage(this.state.imageCurrentNo - 1)
                }
              >
                <i class='fas fa-chevron-left'></i>
              </div>
              <div
                className='buttonNext'
                onClick={() =>
                  this.onChangeImage(this.state.imageCurrentNo + 1)
                }
              >
                <i class='fas fa-chevron-right'></i>
              </div>
            </div>
            <div className='paginationBox'>
              {images?.map((image, no) => (
                <div
                  key={no}
                  onClick={() => {
                    this.onChangeImage(no);
                  }}
                >
                  <picture>
                    <img src={IMAGE_URL.img_url2} alt={IMAGE_URL.alt} />
                  </picture>
                </div>
              ))}
            </div>
          </div> */}
        </article>

        <aside>
          <h1 className='name'>{PRODUCT_DETAIL[0].name}</h1>
          <div className='price'>{PRODUCT_DETAIL[0].price}</div>
          <div className='box'></div>
          <p className='description'>{PRODUCT_DETAIL[0].description}</p>
          <p className='textileInformation'>{PRODUCT_TEXTILE[0].textile}</p>
          <p className='textileInformation'>{PRODUCT_TEXTILE[0].lining}</p>
          <p className='textileInformation'>
            {PRODUCT_TEXTILE[0].fetchOrPrinting}
          </p>
          <p className='textileInformation'>
            Cotton: {PRODUCT_TEXTILE[0].cotton}
          </p>
          <p className='textileInformation'>
            {PRODUCT_TEXTILE[0].manufactureCountry}
          </p>
        </aside>
      </section>
    );
  }
}

export default ProductDetail;
