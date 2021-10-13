import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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
    let { mainImageUrl } = this.props;
    const otherColorSubImageUrl = event.target.src;

    for (let data of mainImageUrl) {
      const imageUrl = data.mainImageUrl;

      if (imageUrl !== otherColorSubImageUrl) {
        this.setState({
          mainImage: otherColorSubImageUrl,
        });
      } else {
        this.setState({
          mainImage: imageUrl,
        });
      }
    }
  };

  changeMainToDetailImage = event => {
    const { detailImage } = this.props;

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
            mainImage: detailImage[idx].detailImageUrl,
          });
          break;
        default:
      }
    });
    console.log(this.state.mainImage);
  };

  changeMainImage = () => {
    this.setState({
      mainImage: this.props.mainImage,
    });
  };

  goToDetailPage = () => {
    this.props.history.push(`/product/${this.props.id}`);
  };

  render() {
    const { mainImageUrl, subImage, name, price, detailImage, id } = this.props;
    const { mainImage } = this.state;
    console.log(id);

    return (
      <div className='ProductCard'>
        <Link to={`/product/${this.props.id}`}>
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
                src={`${mainImageUrl}`}
                alt={name}
                key={mainImageUrl.id}
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
        </Link>
        <div className='subImgWrapper'>
          {subImage &&
            subImage.map(product => {
              return (
                <ProductOtherColorCard
                  key={product.id}
                  subImage={product.subImageUrl}
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

export default withRouter(ProductCard);
