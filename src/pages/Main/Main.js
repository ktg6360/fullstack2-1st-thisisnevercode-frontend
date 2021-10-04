import React, { Component } from 'react';
// import ProductList from './Components/ProductList';
import BottomLink from './Components/BottomLink';
import ProductsSlide from './Components/ProductsSlide';
import './Main.scss';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      firstProducts: [],
      secondProducts: [],
      bottomLink: [],
    };
  }

  componentDidMount() {
    fetch('/data/Main/firstMainImgData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          firstProducts: data,
        });
      });
    fetch('/data/Main/secondMainImgData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          secondProducts: data,
        });
      });
    fetch('/data/Main/mainBottomLinkData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          bottomLink: data,
        });
      });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    const { firstProducts, secondProducts, bottomLink } = this.state;

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
        <div className='productSlide'>
          <ProductsSlide products={firstProducts} />
        </div>
        <div className='productSlide'>
          <ProductsSlide products={secondProducts} />
        </div>
        <div className='bottomLink'>
          <BottomLink bottomLink={bottomLink} />
        </div>
      </div>
    );
  }
}

export default Main;
