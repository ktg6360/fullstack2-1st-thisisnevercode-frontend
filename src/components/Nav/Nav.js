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
    isShorterThanResponsiveBreakPoint: false,
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

    fetch('/category')
      .then(res => {
        return res.json();
      })
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

  logout = () => {
    console.log(localStorage.token);
    if (localStorage.token) {
      return window.localStorage.removeItem('token');
    }
  };

  render() {
    const {
      productsNavMenuData,
      isNavVisible,
      dropdownMenuData,
      isDropdownVisible,
      isSortModalOn,
      isViewModalOn,
    } = this.state;
    const { location } = window;
    const { pathname } = location;
    const pathParam = pathname.slice(-1);
    const pathConditionForBtn =
      pathname !== '/main' &&
      pathname !== '/signin' &&
      pathname !== '/signup' &&
      pathname !== `/product/shoes/${pathParam}`;
    const pathConditionForBreadCrumb =
      pathname !== '/main' && pathname !== '/signin' && pathname !== '/signup';
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
                  src='/images/Nav/thisisnevercode.svg'
                  alt='main logo'
                />
              </Link>
            </div>
            {/* userNavMenu */}
            <ul className='userNavMenu'>
              <li className='navMenuItem'>
                <Link className='navMenuLink' to='/todo'>
                  KOR / ₩
                </Link>
              </li>
              <li className='navMenuItem' onClick={this.logout}>
                <Link
                  className='navMenuLink'
                  to={!localStorage.token && '/signin'}
                >
                  {localStorage.token ? 'LOGOUT' : 'LOGIN'}
                </Link>
              </li>
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
          {pathConditionForBreadCrumb && (
            <BreadCrumb
              dropdownMenuData={dropdownMenuData}
              location={location}
              productInfo={this.props.productInfo}
            />
          )}
          {pathConditionForBtn && (
            <SortBtn
              closeSortModal={this.closeSortModal}
              toggleSortModal={this.toggleSortModal}
              isSortModalOn={isSortModalOn}
              sortOptions={this.props.sortOptions}
              handleSortCheckIcon={this.props.handleSortCheckIcon}
            />
          )}
          {/* {pathConditionForBtn && (
            <ViewBtn
              closeViewModal={this.closeViewModal}
              toggleViewModal={this.toggleViewModal}
              isViewModalOn={isViewModalOn}
              viewOptions={this.props.viewOptions}
              handleViewCheckIcon={this.props.handleViewCheckIcon}
            />
          )} */}
        </nav>
      </>
    );
  }
}

export default Nav;
