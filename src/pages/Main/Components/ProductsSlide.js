import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ProductsSlide.scss';

class ProductsSlide extends Component {
  constructor() {
    super();
    this.state = {
      imagePosition: 0,
    };
  }

  onChangeImage = position => {
    let maxPosition;
    if (window.innerWidth > 1140) {
      maxPosition = Math.ceil((this.props.products.length - 4) / 2); // 큰 화면용
    } else {
      maxPosition = Math.ceil((this.props.products.length - 2) / 2); // 작은 화면용
    }
    if (maxPosition < position) position = 0;
    // 오른쪽 최대치 넘어가면 제일 왼쪽으로 되돌림
    if (position < 0) position = maxPosition;
    // 왼쪽 최대치 넘어가면 제일 오른쪽으로 되돌림
    this.setState({
      imagePosition: position,
    });
  };

  render() {
    const { products } = this.props;
    const { imagePosition } = this.state;

    return (
      <div className='productsSlide'>
        <div className='slideBox'>
          <div
            className='buttonPrev'
            onClick={() => this.onChangeImage(imagePosition - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size='4x' />
          </div>
          <div
            className='buttonNext'
            onClick={() => this.onChangeImage(imagePosition + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} size='4x' />
          </div>
          <div
            className='slideList'
            style={{
              transform: `translateX(
                ${imagePosition * (window.innerWidth > 1140 ? -50 : -100)}vw`,
            }}
          >
            {products.map(image => (
              <Link className='slideContent' to='/productList' key={image.id}>
                <img alt={image.name} src={image.imgUrl} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsSlide;
