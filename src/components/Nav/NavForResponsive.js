import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './NavForResponsive.scss';
class NavForResponsive extends Component {
  render() {
    return (
      <div className='NavForResponsive'>
        <div className='hamburgerBtnBox'>
          <FontAwesomeIcon className='hamburgerBtn' icon={faBars} size='lg' />
        </div>
        <div className='mainLogoContainer'>
          <Link to='/main'>
            <img
              className='mainLogo'
              src='/images/Nav/thisisnevercode.svg'
              alt='main logo'
            />
          </Link>
        </div>
        <div className='cartBoxForResponsive'>
          <FontAwesomeIcon
            className='cartIconForResponsive'
            icon={faShoppingCart}
            size='lg'
          />
          <span className='cartCountNumForResponsive'>1</span>
        </div>
      </div>
    );
  }
}
export default NavForResponsive;
