import React, { Component } from 'react';
import ProductList from './Components/ProductList';
import BottomLink from './Components/BottomLink';
import './Main.scss';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      bottomLink: [],
    };
  }

  componentDidMount() {
    fetch('/data/Main/mainImgData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data,
        });
      });
    fetch('/data/Main/mainBottomLinkData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          bottomLink: data,
        });
      });
  }

  render() {
    const { products, bottomLink } = this.state;

    return (
      <div className='Main'>
        <div className='Nav'>
          <div>
            <span>SHOP</span>
            <span>TOP20</span>
            <span>FEATURES</span>
            <span>SEARCH</span>
          </div>
          <div>
            <span className='middle'>thisisnevercode</span>
          </div>
          <div>
            <span>KOR / ₩</span>
            <span>LOGIN</span>
            <span>CART</span>
          </div>
        </div>
        <div className='mainSection'>
          <ProductList products={products} />
        </div>
        <div className='bottomLink'>
          <BottomLink bottomLink={bottomLink} />
        </div>
      </div>
    );
  }
}

export default Main;
