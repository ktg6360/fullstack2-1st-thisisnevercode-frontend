import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ImageSlide.scss';

class ImageSlide extends Component {
  constructor() {
    super();
    this.state = {
      imagePosition: 0,
    };
  }

  changeImageToLeft = position => {
    const slideLength = this.props.images.length;
    let newPosition = position - 1;
    let maxPosition;

    if (window.innerWidth > 1140) {
      maxPosition = Math.ceil((slideLength - 4) / 2); // 큰 화면용
    } else {
      maxPosition = Math.ceil(slideLength - 2); // 작은 화면용
    }
    if (newPosition < 0) newPosition = maxPosition; // 오른쪽 최대치 넘어가면 제일 왼쪽으로 되돌림

    this.setState({
      imagePosition: newPosition,
    });
  };

  changeImageToRight = position => {
    const slideLength = this.props.images.length;
    let newPosition = position + 1;
    let maxPosition;

    if (window.innerWidth > 1140) {
      maxPosition = Math.ceil((slideLength - 4) / 2); // 큰 화면용
    } else {
      maxPosition = Math.ceil(slideLength - 2); // 작은 화면용
    }
    if (maxPosition < newPosition) newPosition = 0; // 왼쪽 최대치 넘어가면 제일 오른쪽으로 되돌림

    this.setState({
      imagePosition: newPosition,
    });
  };

  render() {
    const { images } = this.props;
    const { imagePosition } = this.state;

    return (
      <div className='ImageSlide'>
        <div className='slideBox'>
          <button
            className='slideBtn btnPrev'
            onClick={() => this.changeImageToLeft(imagePosition)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size='2x' />
          </button>
          <button
            className='slideBtn btnNext'
            onClick={() => this.changeImageToRight(imagePosition)}
          >
            <FontAwesomeIcon icon={faChevronRight} size='2x' />
          </button>
          <div
            className='slideList'
            style={{
              transform: `translateX(
                ${imagePosition * -50}vw`,
            }}
          >
            {images &&
              images.map(image => (
                <Link
                  className='slideContent'
                  to='/products/shoes'
                  key={image.id}
                >
                  <img
                    className='slideImage'
                    alt={image.name}
                    src={image.imgUrl}
                  />
                </Link>
              ))}
            {images &&
              images.map(image => (
                <Link
                  className='slideContent'
                  to='/products/shoes'
                  key={image.id}
                >
                  <img
                    className='slideImage'
                    alt={image.name}
                    src={image.imgUrl}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageSlide;
