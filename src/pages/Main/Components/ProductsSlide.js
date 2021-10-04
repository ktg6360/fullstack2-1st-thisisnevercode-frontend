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
    if (this.props.products.length - 9 <= position) position = 0;
    // 오른쪽 최대치 넘어가면 제일 왼쪽으로 되돌림
    if (position < 0) position = this.props.products.length - 10;
    // 왼쪽 최대치 넘기면 제일 오른쪽으로 되돌림
    this.setState({
      imagePosition: position,
    });
  };

  render() {
    const { products } = this.props;
    return (
      <div className='productsSlide'>
        <div className='slideBox'>
          <div
            className='buttonPrev'
            onClick={() => this.onChangeImage(this.state.imagePosition - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size='4x' />
          </div>
          <div
            className='buttonNext'
            onClick={() => this.onChangeImage(this.state.imagePosition + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} size='4x' />
          </div>

          <div
            className='slideList'
            style={{
              transform: `translate3d(
                ${this.state.imagePosition * -50}vw, 0px, 0px`,
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
