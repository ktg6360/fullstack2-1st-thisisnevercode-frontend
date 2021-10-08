import React, { Component } from 'react';
// import ProductDetailCard from './ProductDetailCard';
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

  changeMainToDetailImage = event => {
    const { detailImage } = this.props;

    // for (let data = 0; data < detailImage.length; data++) {
    const hoverEventArea = {
      hoverEventArea0: 0,
      hoverEventArea1: 1,
      hoverEventArea2: 2,
      hoverEventArea3: 3,
    };

    [
      'hoverEventArea0',
      'hoverEventArea1',
      'hoverEventArea2',
      'hoverEventArea3',
    ].map(area => {
      const idx = hoverEventArea[area];
      switch (event.target.className) {
        case `hoverEventArea${idx}`:
          this.setState({
            mainImage: detailImage[idx].image,
          });
          break;
        default:
      }
    });
  };

  changeMainImage = () => {
    this.setState({
      mainImage: this.props.mainImage,
    });
  };

  goToDetailPage = () => {
    this.props.history.push();
  };

  render() {
    const { image, subImage, name, price, detailImage } = this.props;
    const { mainImage } = this.state;

    return (
      <div className='ProductCard'>
        <div className='productWrapper'>
          {[
            'hoverEventArea0',
            'hoverEventArea1',
            'hoverEventArea2',
            'hoverEventArea3',
          ].map((className, index) => {
            return (
              <div
                className={className}
                onMouseEnter={this.changeMainToDetailImage}
                onMouseLeave={this.changeMainImage}
                key={index}
              />
            );
          })}

          <div className='imageWrapper'>
            <img
              className='mainImage'
              src={`${image}`}
              alt={name}
              key={image.id}
            />
            {mainImage ? (
              <img
                className='ProductDetailCard'
                src={`${mainImage}`}
                alt={detailImage.image}
                key={detailImage.id}
              />
            ) : null}
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
