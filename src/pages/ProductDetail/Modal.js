import { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <>
        {this.props.modalOn ? (
          <div>
            {this.props.producInfo.subImg.map((image, idx) => (
              <img key={idx} src={image.imgUrl} alt={image.alt} />
            ))}
          </div>
        ) : null}
      </>
    );
  }
}

export default Modal;
