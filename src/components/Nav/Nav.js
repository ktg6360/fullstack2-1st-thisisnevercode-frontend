import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import Dropdown from './Dropdown';
import SortBtn from './SortBtn';
import ViewBtn from './ViewBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './Nav.scss';
class Nav extends Component {
  state = {
    isNavVisible: true,
    prevScrollPos: 0,
    isDropdownVisible: false,
    productsNavMenuData: [],
    usersNavMenuData: [],
    dropdownMenuData: [],
    isViewWindowOn: false,
    isSortWindowOn: false,
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
    this.setState(state => {
      if (currentScrollPos % 10 === 0) {
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
  openViewWindow = () => {
    this.setState({
      isViewWindowOn: true,
      isSortWindowOn: false,
    });
  };

  closeViewWindow = () => {
    this.setState({
      isViewWindowOn: false,
    });
  };
  openSortWindow = () => {
    this.setState({
      isSortWindowOn: true,
      isViewWindowOn: false,
    });
  };

  closeSortWindow = () => {
    this.setState({
      isSortWindowOn: false,
    });
  };

  render() {
    const {
      productsNavMenuData,
      usersNavMenuData,
      isNavVisible,
      dropdownMenuData,
      isDropdownVisible,
      isSortWindowOn,
      isViewWindowOn,
    } = this.state;
    const { location } = this.props;

    return (
      <>
        <nav className={isNavVisible ? 'Nav navActive' : 'Nav navHidden'}>
          <div className='navWrapper'>
            {/* productsNavMenu */}
            <ul className='productsNavMenu'>
              <li
                className='navMenuItem'
                onMouseLeave={this.makeInvisibleDropdown}
              >
                <Link
                  to='/SHOP'
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
                return (
                  <li key={productNavMenu.id} className='navMenuItem'>
                    <Link
                      className='navMenuLink'
                      to={`/${productNavMenu.name}`}
                    >
                      {productNavMenu.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Main Logo */}
            <div className='mainLogoContainer'>
              <img
                className='mainLogo'
                src='/images/Nav/mainlogo.svg'
                alt='main logo'
              />
            </div>
            {/* userNavMenu */}
            <ul className='userNavMenu'>
              {usersNavMenuData.map(userNavMenu => {
                return (
                  <li key={userNavMenu.id} className='navMenuItem'>
                    <Link className='navMenuLink' to={`/${userNavMenu.name}`}>
                      {userNavMenu.name}
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
          <BreadCrumb dropdownMenuData={dropdownMenuData} location={location} />
          <SortBtn
            openSortWindow={this.openSortWindow}
            closeSortWindow={this.closeSortWindow}
            isSortWindowOn={isSortWindowOn}
          />
          <ViewBtn
            openViewWindow={this.openViewWindow}
            closeViewWindow={this.closeViewWindow}
            isViewWindowOn={isViewWindowOn}
          />
        </nav>
      </>
    );
  }
}

export default Nav;
