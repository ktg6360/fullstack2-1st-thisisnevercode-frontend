import React, { Component } from 'react';
import ProductDetailCard from './ProductDetailCard';
import ProductOtherColorCard from './ProductOtherColorCard';
import './ProductCard.scss';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '',
    };
  }

  changeSubImage = event => {
    let { detailImage } = this.props;
    for (let detailImg of detailImage) {
      if (detailImg.img !== event.target.src) {
        this.setState({
          mainImage: event.target.src,
        });
      } else {
        this.setState({
          mainImage: detailImg.img,
        });
      }
    }
  };

  hover = event => {
    const { detailImage } = this.props;
    for (let detailImg = 0; detailImg < detailImage.length; detailImg++) {
      switch (event.target.className) {
        case 'eventArea1':
          this.setState({
            mainImage: detailImage[0].image,
          });
          break;
        case 'eventArea2':
          this.setState({
            mainImage: detailImage[1].image,
          });
          break;
        case 'eventArea3':
          this.setState({
            mainImage: detailImage[2].image,
          });
          break;
        case 'eventArea4':
          this.setState({
            mainImage: detailImage[3].image,
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
    const { image, subImage, name, price, detailImage } = this.props;
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
            <img src={image} alt={name} className='productMainImage' />
            {/* <div
              className='productMainImage'
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            ></div> */}
            {detailImage &&
              detailImage.map(product => {
                return (
                  <ProductDetailCard
                    key={product.detail_id}
                    detailImage={mainImage}
                    name={product.name}
                  />
                );
              })}
            {/* {detailImage &&
              detailImage.map(product => {
                return (
                  <img
                    className='ProductDetailCard'
                    key={product.detail_id}
                    src={mainImage}
                    name={product.name}
                  />
                );
              })} */}
          </div>
        </div>
        <div className='subImgWrapper'>
          {subImage &&
            subImage.map(product => {
              return (
                <ProductOtherColorCard
                  key={product.id}
                  subImage={product.image}
                  name={product.name}
                  changeSubImage={this.changeSubImage}
                />
              );
            })}
        </div>
        <p className='productName'>{name}</p>
        <p className='productPrice'>{price}</p>
      </div>
    );
  }
}

export default ProductCard;
