import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './ProductImgSlide.scss';

class ProductImgSlide extends Component {
  render() {
    return (
      <div className='ProductImgSlide'>
        <div className='imgNumber'>
          <span>{this.props.imgNo + 1}</span>
          <span>/</span>
          <span>
            {this.props.productInfo.detailImg &&
              this.props.productInfo.detailImg.length}
          </span>
        </div>

        <div className='slideimgBox'>
          <div
            className='imgList'
            style={{
              transform: `translate3d(
                ${this.props.imgNo * -500}px, 0px, 0px`,
            }}
          >
            {this.props.productInfo.detailImg.map((info, idx) => (
              <img
                key={idx}
                className='slideImg'
                src={info.detailImg}
                alt={info.alt}
              />
            ))}
          </div>
        </div>

        <FontAwesomeIcon
          icon={faChevronLeft}
          className='buttonPrev'
          onClick={() => this.props.onChangeImage(this.props.imgNo - 1)}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faChevronRight}
          className='buttonNext'
          onClick={() => this.props.onChangeImage(this.props.imgNo + 1)}
        ></FontAwesomeIcon>
      </div>
    );
  }
}

export default ProductImgSlide;
