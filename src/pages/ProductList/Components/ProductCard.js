import React, { Component } from 'react';
import ProductOtherColorCard from './ProductOtherColorCard';
import './ProductCard.scss';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: this.props.productImg,
    };
  }

  changeSubImage = e => {
    let { productImg } = this.props;
    if (e.target.src !== productImg) {
      this.setState({
        mainImage: e.target.src,
      });
    } else {
      this.setState({
        mainImage: productImg,
      });
    }
  };

  hover = e => {
    this.getDetailImag();

    const { productDetailImg } = this.props;
    const newDetailData = [...productDetailImg];
    for (let data of newDetailData) {
      for (let i = 0; i < data.detailImg.length; i++) {
        switch (e.target.className) {
          case 'eventArea1':
            this.setState({
              mainImage: data.detailImg[0].img,
            });
            break;
          case 'eventArea2':
            this.setState({
              mainImage: data.detailImg[1].img,
            });
            break;
          case 'eventArea3':
            this.setState({
              mainImage: data.detailImg[2].img,
            });
            break;
          case 'eventArea4':
            this.setState({
              mainImage: data.detailImg[3].img,
            });
            break;
          default:
        }
      }
    }
  };

  getDetailImag = () => {
    const { productDetailImg } = this.props;
    const newDetailArr = [];
    for (let detail = 0; detail < productDetailImg.length; detail++) {
      for (let detailImg of productDetailImg[detail].detailImg) {
        newDetailArr.push(detailImg);
      }
      const a = newDetailArr.slice(4 * detail, 4 * (detail + 1));
      console.log('내가 콘솔', a);
    }
  };

  hoverOut = e => {
    this.setState({
      mainImage: this.props.productImg,
    });
  };

  render() {
    const {
      productSubImg,
      productImg,
      productDetailImg,
      productName,
      productPrice,
      changeDetailProductImage,
      mainData,
    } = this.props;
    const { mainImage } = this.state;
    return (
      <div className='ProductCard'>
        <div className='productImageWrapper'>
          <div
            className='eventArea1'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>
          <div
            className='eventArea2'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
            onClick={this.getDetailImag}
          ></div>
          <div
            className='eventArea3'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>
          <div
            className='eventArea4'
            onMouseEnter={this.hover}
            onMouseLeave={this.hoverOut}
          ></div>
          {productDetailImg.map(data => {
            const { detailImg } = data;
            // console.log(detailImg);
            return (
              <div>
                {detailImg.map(data => {
                  return (
                    <img
                      className='productDetailImage'
                      key={data.detail_id}
                      alt={data.name}
                      src={data.img}
                      onMouseOver={changeDetailProductImage}
                      onMouseLeave={this.hoverOut}
                    />
                  );
                })}
              </div>
            );
          })}
          <img
            className='productImage'
            src={mainImage}
            alt={productName}
            onMouseOver={changeDetailProductImage}
            onMouseLeave={this.hoverOut}
          />
        </div>
        <div className='subImgWrapper'>
          {productSubImg.map(product => {
            return (
              <ProductOtherColorCard
                mainImage={productImg}
                key={product.id}
                subImage={product.img}
                name={product.name}
                changeSubImage={this.changeSubImage}
              />
            );
          })}
        </div>
        <h2 className='productName'>{productName}</h2>
        <h2 className='productPrice'>{productPrice}</h2>
      </div>
    );
  }
}

export default ProductCard;
