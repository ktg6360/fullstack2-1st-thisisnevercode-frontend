import { Component } from 'react';
import './PaginationBox.scss';

class PaginationBox extends Component {
  render() {
    return (
      <div className='PaginationBox'>
        {this.props.productInfo.detailImg.map((image, idx) => (
          <div
            key={idx}
            onClick={() => {
              this.props.onChangeImage(idx);
            }}
          >
            <img
              className='paginationImg'
              src={image.detailImg}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default PaginationBox;
