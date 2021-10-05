import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import './Main.scss';

class Main extends Component {
  render() {
    console.log(this.props.location);
    return (
      <div className='Main'>
        <Nav location={this.props.location} />
        <div className='test'></div>
      </div>
    );
  }
}

export default Main;
