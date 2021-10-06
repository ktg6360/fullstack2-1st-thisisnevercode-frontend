import { Component } from 'react';
import { IMAGE_URL } from './images';
import './PaginationBox.scss';

class PaginationBox extends Component {
  render() {
    return (
      <div className='paginationBox'>
        {IMAGE_URL[0].img.map((image, idx) => (
          <div
            key={IMAGE_URL[0].id}
            onClick={() => {
              this.props.onChangeImage(idx);
            }}
          >
            <img src={IMAGE_URL[0].img} alt={IMAGE_URL[0].alt} />
          </div>
        ))}
      </div>
    );
  }
}

export default PaginationBox;
