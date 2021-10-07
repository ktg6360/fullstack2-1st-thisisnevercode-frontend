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
    let { image } = this.props;
    const otherColorSubImageUrl = event.target.src;

    for (let data of image) {
      const mainImageUrl = data.image;

      if (mainImageUrl !== otherColorSubImageUrl) {
        this.setState({
          mainImage: otherColorSubImageUrl,
        });
      } else {
        this.setState({
          mainImage: mainImageUrl,
        });
      }
    }
  };

  changeMainToDetailImage = () => {
    const { detailImage } = this.props;

    for (let data = 0; data < detailImage.length; data++) {
      const hoverEventArea = {
        firstHoverEventArea: 0,
        secondHoverEventArea: 1,
        thirdHoverEventArea: 2,
        fourthHoverEventArea: 3,
      };
      [
        'firstHoverEventArea',
        'secondHoverEventArea',
        'thirdHoverEventArea',
        'fourthHoverEventArea',
      ].map(area => {
        const idx = hoverEventArea[area];
        return this.setState({
          mainImage: detailImage[idx].image,
        });
      });
    }
  };

  changeMainImage = () => {
    this.setState({
      mainImage: this.props.mainImage,
    });
  };

  render() {
    const { image, subImage, name, price, detailImage } = this.props;
    const { mainImage } = this.state;

    return (
      <div className='ProductCard'>
        <div className='productWrapper'>
          {[
            'firstHoverEventArea',
            'secondHoverEventArea',
            'thirdHoverEventArea',
            'fourthHoverEventArea',
          ].map(className => {
            return (
              <div
                className={className}
                onMouseEnter={this.changeMainToDetailImage}
                onMouseLeave={this.changeMainImage}
              />
            );
          })}

          <div className='imageWrapper'>
            <div
              className='mainImage'
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
            {detailImage &&
              detailImage.map(product => {
                return <ProductDetailCard detailImage={mainImage} />;
              })}
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
