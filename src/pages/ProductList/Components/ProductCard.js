import React, { Component } from 'react';
import ProductOtherColorCard from './ProductOtherColorCard';
import ProductDetailCard from './ProductDetailCard';
import './ProductCard.scss';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '',
    };
  }

  changeSubImage = e => {
    let { productDetailImg } = this.props;
    for (let detailImg of productDetailImg) {
      if (detailImg.img !== e.target.src) {
        this.setState({
          mainImage: e.target.src,
        });
      } else {
        this.setState({
          mainImage: detailImg.img,
        });
      }
    }
  };

  hover = e => {
    const { productDetailImg } = this.props;
    for (let detailImg = 0; detailImg < productDetailImg.length; detailImg++) {
      switch (e.target.className) {
        case 'eventArea1':
          this.setState({
            mainImage: productDetailImg[0].img,
          });
          break;
        case 'eventArea2':
          this.setState({
            mainImage: productDetailImg[1].img,
          });
          break;
        case 'eventArea3':
          this.setState({
            mainImage: productDetailImg[2].img,
          });
          break;
        case 'eventArea4':
          this.setState({
            mainImage: productDetailImg[3].img,
          });
          break;
        default:
      }
    }
  };

  hoverOut = e => {
    this.setState({
      mainImage: this.props.mainImage,
    });
  };

  render() {
    const {
      productImg,
      productSubImg,
      productName,
      productPrice,
      productDetailImg,
    } = this.props;
    const { mainImage } = this.state;
    return (
      <div className='ProductCard'>
        <div className='productImageWrapper'>
          <div
            className='eventArea1'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>
          <div
            className='eventArea2'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>
          <div
            className='eventArea3'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>
          <div
            className='eventArea4'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>

          <div className='detailImgWrapper'>
            <div
              className='productMainImg'
              style={{
                backgroundImage: `url(${productImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            ></div>
            {productDetailImg &&
              productDetailImg.map(product => {
                return (
                  <ProductDetailCard
                    key={product.detail_id}
                    detailImage={mainImage}
                    name={product.name}
                  />
                );
              })}
          </div>
        </div>
        <div className='subImgWrapper'>
          {productSubImg &&
            productSubImg.map(product => {
              return (
                <ProductOtherColorCard
                  key={product.id}
                  subImage={product.img}
                  name={product.name}
                  changeSubImage={this.changeSubImage}
                />
              );
            })}
        </div>
        <p className='productName'>{productName}</p>
        <p className='productPrice'>{productPrice}</p>
      </div>
    );
  }
}

export default ProductCard;
