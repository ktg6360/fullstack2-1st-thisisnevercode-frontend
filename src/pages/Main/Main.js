import React, { Component } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Nav from '../../components/Nav';
import './Main.scss';

class Main extends Component {
  render() {
    return (
      <div className='Main'>
        <Nav />
        {/* <BreadCrumb /> */}
        <div className='test'></div>
      </div>
    );
  }
}

export default Main;
