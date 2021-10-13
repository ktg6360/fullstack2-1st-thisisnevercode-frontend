import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className='Footer'>
        <div className='upperFooter'>
          <ul className='upperFooterSocialBox'>
            <li className='upperFooterSocialItem'>
              <FontAwesomeIcon icon={faInstagram} size='lg' />
            </li>
            <li className='upperFooterSocialItem'>
              <FontAwesomeIcon icon={faYoutube} size='lg' />
            </li>
            <li className='upperFooterSocialItem'>
              <FontAwesomeIcon icon={faComment} size='lg' />
            </li>
            <li className='upperFooterSocialItem'>
              <FontAwesomeIcon icon={faFacebookF} size='lg' />
            </li>
          </ul>
          <ul className='upperFooterMenuBox'>
            <li className='upperFooterMenuItem'>NEWSLETTER</li>
            <li className='upperFooterMenuItem'>STORES</li>
            <li className='upperFooterMenuItem'>CONTACT</li>
            <li className='upperFooterMenuItem'>SHIPPING&RETURNS</li>
            <li className='upperFooterMenuItem'>PRIVACY POLICY</li>
            <li className='upperFooterMenuItem'>TERMS&CONDITIONS</li>
          </ul>
          <div className='copyrightBox'>&copy; 2021 thisisnevercode</div>
        </div>
        <div className='lowerFooter'>
          <ul className='lowerFooterMenuBox'>
            <li className='lowerFooterMenuItem'>주식회사 디네코</li>
            <li className='lowerFooterMenuItem'>대표 김민재</li>
            <li className='lowerFooterMenuItem'>
              서울특별시 코드구 취업으로 바로가길 11-2, 1층
            </li>
            <li className='lowerFooterMenuItem'>
              사업자 등록번호:000-00-00000
            </li>
            <li className='lowerFooterMenuItem'>
              통신판매업 신고:2021-없습니다-0000
            </li>
            <li className='lowerFooterMenuItem'>전화: +82 0) 1234 3214</li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
