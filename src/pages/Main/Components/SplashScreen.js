import React, { Component } from 'react';
import './SplashScreen.scss';

class SplashScreen extends Component {
  render() {
    return (
      <div className='SplashScreen'>
        <img
          className='SplashScreenLogo'
          alt='메인로고'
          src='/images/Main/thisisnevercode.svg'
        />
      </div>
    );
  }
}

export default SplashScreen;
