import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.scss';

class ProductList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div className='imgRow'>
        {products.map(product => {
          return (
            <Link to='/productList' key={product.id}>
              <img alt={product.name} src={product.imgUrl} />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ProductList;
