import React, { Component } from 'react';
import GoBackToTopButton from './Components/GoBackToTopButton';
import ProductCard from './Components/ProductCard';
// import Nav from '../../components/Nav';

import './ProductList.scss';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      productMainImg: [],
      productSubImg: [],
      productDetailImg: [],
    };
  }

  componentDidMount() {
    fetch('/data/ProductList/PRODUCT_LIST_DATA.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          productsData: data.PRODUCT_DATA.product,
        });
      });
  }

  changeDetailProductImage = e => {
    const { productsData } = this.state;
    const mainArr = [];
    const mainData = [...productsData];
    for (let data of mainData) {
      mainArr.push(data);
    }
    this.setState({
      productMainImg: mainArr,
    });

    const { productDetailImg } = this.state;
    const newDetailData = [...productDetailImg];
    for (let detail = 0; detail < newDetailData.length; detail++) {
      this.setState({
        productDetailImg: productDetailImg[detail].detailImg,
      });
    }
  };

  render() {
    const { productsData } = this.state;
    return (
      <main className='ProductList'>
        <div className='ProductComponentWrapper'>
          {productsData.map(product => {
            return (
              <ProductCard
                key={product.id}
                productImg={product.img}
                productSubImg={product.subImg}
                productDetailImg={product.detailImg}
                productName={product.name}
                productPrice={product.price}
                productsData={this.state.productsData}
              />
            );
          })}

          <br />
        </div>
        <GoBackToTopButton />
      </main>
    );
  }
}

export default ProductList;
