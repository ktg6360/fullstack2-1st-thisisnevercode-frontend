import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from './BreadCrumb';
import Dropdown from './Dropdown';
import SortBtn from './SortBtn';
import ViewBtn from './ViewBtn';
import { convertToUrlForNav } from '../../utils/urlConverter';
import './Nav.scss';
class Nav extends Component {
  state = {
    isNavVisible: true,
    prevScrollPos: 0,
    productsNavMenuData: [],
    usersNavMenuData: [],
    isDropdownVisible: false,
    dropdownMenuData: [],
    isViewModalOn: false,
    isSortModalOn: false,
    isShorterThanResponsiveBreakPoin: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    fetch('/data/Nav/navMenu.json')
      .then(res => res.json())
      .then(navMenuData =>
        this.setState({
          productsNavMenuData: navMenuData.productsNavMenus,
          usersNavMenuData: navMenuData.usersNavMenus,
        })
      )
      .catch(console.log);

    fetch('/data/Nav/dropdownMenu.json')
      .then(res => res.json())
      .then(dropdownMenuData =>
        this.setState({
          dropdownMenuData,
        })
      )
      .catch(console.log);
  }

  handleScroll = () => {
    const { prevScrollPos } = this.state;
    const currentScrollPos = document.body.getBoundingClientRect().top;
    const setStateChangePoint = currentScrollPos % 10 === 0;
    this.setState(state => {
      if (setStateChangePoint) {
        return {
          prevScrollPos: currentScrollPos,
          isNavVisible: currentScrollPos >= prevScrollPos,
        };
      }
    });
  };

  makeVisibleDropdown = () => {
    this.setState({
      isDropdownVisible: true,
    });
  };

  makeInvisibleDropdown = () => {
    this.setState({
      isDropdownVisible: false,
    });
  };

  closeViewModal = () => {
    this.setState({
      isViewModalOn: false,
    });
  };

  closeSortModal = () => {
    this.setState({
      isSortModalOn: false,
    });
  };

  toggleSortModal = () => {
    const { isSortModalOn } = this.state;
    this.setState({
      isSortModalOn: !isSortModalOn,
      isViewModalOn: false,
    });
  };

  toggleViewModal = () => {
    const { isViewModalOn } = this.state;
    this.setState({
      isViewModalOn: !isViewModalOn,
      isSortModalOn: false,
    });
  };

  render() {
    const {
      productsNavMenuData,
      usersNavMenuData,
      isNavVisible,
      dropdownMenuData,
      isDropdownVisible,
      isSortModalOn,
      isViewModalOn,
    } = this.state;
    const { location } = this.props;
    return (
      <>
        <nav className={isNavVisible ? 'Nav navActive' : 'Nav navHidden'}>
          <div className='navForResponsive'>
            <div className='hamburgerBtnBox'>
              <FontAwesomeIcon
                className='hamburgerBtn'
                icon={faBars}
                size='lg'
              />
            </div>
            <div className='mainLogoContainer'>
              <img
                className='mainLogo'
                src='/images/Nav/mainlogo.svg'
                alt='main logo'
              />
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
          <div className='navWrapper'>
            {/* productsNavMenu */}
            <ul className='productsNavMenu'>
              <li
                className='navMenuItem'
                onMouseLeave={this.makeInvisibleDropdown}
              >
                <Link
                  to='/shop'
                  className='navMenuLink'
                  onMouseEnter={this.makeVisibleDropdown}
                >
                  SHOP
                </Link>
                {isDropdownVisible && (
                  <Dropdown dropdownMenuData={dropdownMenuData} />
                )}
              </li>
              {productsNavMenuData.map(productNavMenu => {
                const { id, name } = productNavMenu;
                return (
                  <li key={id} className='navMenuItem'>
                    <Link
                      className='navMenuLink'
                      to={`/${convertToUrlForNav(name)}`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Main Logo */}
            <div className='mainLogoContainer'>
              <Link to={'/main'}>
                <img
                  className='mainLogo'
                  src='/images/Nav/mainlogo.svg'
                  alt='main logo'
                />
              </Link>
            </div>
            {/* userNavMenu */}
            <ul className='userNavMenu'>
              {usersNavMenuData.map(userNavMenu => {
                const { id, name } = userNavMenu;
                return (
                  <li key={id} className='navMenuItem'>
                    <Link
                      className='navMenuLink'
                      to={`/${convertToUrlForNav(name)}`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
              <li className='navMenuItem'>
                <Link className='navMenuLink' to='/cart'>
                  <span className='cartItem'>CART</span>
                  <FontAwesomeIcon
                    className='cartCountIcon'
                    icon={faCircle}
                    size='lg'
                  />
                  <span className='cartCountNum'>1</span>
                </Link>
              </li>
            </ul>
          </div>
          {location !== 'main' || (
            <BreadCrumb
              dropdownMenuData={dropdownMenuData}
              location={location}
            />
          )}
          <SortBtn
            closeSortModal={this.closeSortModal}
            toggleSortModal={this.toggleSortModal}
            isSortModalOn={isSortModalOn}
          />
          <ViewBtn
            closeViewModal={this.closeViewModal}
            toggleViewModal={this.toggleViewModal}
            isViewModalOn={isViewModalOn}
          />
        </nav>
      </>
    );
  }
}

export default Nav;
