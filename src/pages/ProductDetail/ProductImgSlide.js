import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './ProductImgSlide.scss';

class ProductImgSlide extends Component {
  render() {
    return (
      <div className='ProductImgSlide'>
        <div className='imgNumbering'>
          <span>{this.props.imgNo + 1}</span>
          <span>/</span>
          <span>
            {this.props.productInfo.subImg &&
              this.props.productInfo.subImg.length}
          </span>
        </div>

        <div className='imgSlideBox'>
          <div className='imgList'>
            {this.props.productInfo.subImg.map((info, idx) => (
              <div className='slideContent' key={idx}>
                <img src={info.imgUrl} alt={info.alt} />
              </div>
            ))}
          </div>
        </div>

        <FontAwesomeIcon
          icon={faHeart}
          className='buttonPrev'
          onClick={() => this.props.onChangeImage(this.props.imgNo - 1)}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faHeart}
          className='buttonNext'
          onClick={() => this.props.onChangeImage(this.props.imgNo + 1)}
        ></FontAwesomeIcon>
      </div>
    );
  }
}

export default ProductImgSlide;
