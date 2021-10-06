import { Component } from 'react';
import './PaginationBox.scss';

class PaginationBox extends Component {
  render() {
    console.log(this.props.productInfo);
    return (
      <div className='PaginationBox'>
        {this.props.productInfo.subImg.map((image, idx) => (
          <div
            key={idx}
            onClick={() => {
              this.props.onChangeImage(idx);
            }}
          >
            <img src={image.imgUrl} alt={image.alt} />
          </div>
        ))}
      </div>
    );
  }
}

export default PaginationBox;
