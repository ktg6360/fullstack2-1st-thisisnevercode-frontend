import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IMAGE_URL } from './images';
import './ProductImgSlide.scss';

class ProductImgSlide extends Component {
  render() {
    return (
      <div className='productImgSlide'>
        <div className='imgNumbering'>
          <span>{this.props.imgNo + 1}</span>
          <span>/</span>
          <span>{this.props.img && this.props.img.length}</span>
        </div>

        <div className='imgSlideBox'>
          <div className='imgList'>
            {IMAGE_URL[0].img.map(() => (
              <div className='slideContent' key={IMAGE_URL[0].id}>
                <img src={IMAGE_URL[0].img} alt={IMAGE_URL[0].alt} />
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
