import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './Nav.scss';
class Nav extends Component {
  state = {
    isVisible: true,
    prevScrollPos: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollPos } = this.state;
    const currentScrollPos = document.body.getBoundingClientRect().top;
    this.setState(state => {
      if (currentScrollPos % 50 === 0) {
        return {
          prevScrollPos: currentScrollPos,
          isVisible: currentScrollPos >= prevScrollPos,
        };
      }
    });
  };

  render() {
    return (
      <nav className={this.state.isVisible ? 'Nav active' : 'Nav hidden'}>
        <ul className='productsNavMenu'>
          <Link>
            <li className='navMenuItem'>SHOP</li>
          </Link>
          <Link>
            <li className='navMenuItem'>TOP20</li>
          </Link>
          <Link>
            <li className='navMenuItem'>FEATURES</li>
          </Link>
          <Link>
            <li className='navMenuItem'>SEARCH</li>
          </Link>
        </ul>
        <div className='mainLogoContainer'>
          <img
            className='mainLogo'
            src='images/Nav/mainlogo.svg'
            alt='main logo'
          />
        </div>
        <ul className='userNavMenu'>
          <Link>
            <li className='navMenuItem'>KOR / ₩</li>
          </Link>
          <Link>
            <li className='navMenuItem'>LOGIN</li>
          </Link>
          <Link>
            <li className='navMenuItem'>
              <span className='cartItem'>CART</span>
              <FontAwesomeIcon
                className='cartCountIcon'
                icon={faCircle}
                size='lg'
              />
              <span className='cartCountNum'>1</span>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
