import { Component } from 'react';
import Modal from './Modal';
import './ProductInfo.scss';
class ProductInfo extends Component {
  render() {
    const { name, price, description, textileInfo } = this.props.productInfo;

    return (
      <div className='ProductInfo'>
        <div>
          <h1 className='name'>{name}</h1>
          <p className='price'>{price}</p>
          <button className='addCartBtn'>Add To Cart</button>
          <p className='description'>{description}</p>
          <p className='textileInformation'>{textileInfo}</p>
        </div>
        <div>
          <p onClick={this.props.handleModal}>
            SHIPPING
            <Modal
              productInfo={this.productInfo}
              imgNo={this.props.imageCurrentNo}
              handleModal={this.props.handleModal}
              modalOn={this.props.modalOn}
            />
          </p>
        </div>
      </div>
    );
  }
}

export default ProductInfo;

// <div>
// {this.props.modalOn && (
//   <button onClick={this.props.handleModal}>
//     SHIPPING
//     {this.props.productInfo.subImg.map((image, idx) => (
//       <img key={idx} src={image.imgUrl} alt={image.alt} />
//     ))}
//     <button onClick={this.props.handleModal}>확인</button>
//   </button>
// )}
