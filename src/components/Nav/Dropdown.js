import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.scss';

class Dropdown extends Component {
  state = {
    dropdownMenuData: [],
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    fetch('/data/Nav/dropdownMenu.json')
      .then(res => res.json())
      .then(dropdownMenuData => this.setState({ dropdownMenuData }))
      .catch(console.log);
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  render() {
    const { dropdownMenuData } = this.props;
    const dropdownMenuDataWithoutSubCategory = dropdownMenuData.filter(
      data => !data.subCategoryName
    );
    const dropdownMenuDataWithSubCategory = dropdownMenuData.filter(
      data => data.subCategoryName
    );
    if (dropdownMenuDataWithSubCategory[0] === undefined) {
      dropdownMenuDataWithSubCategory[0] = [];
      dropdownMenuDataWithSubCategory[0].subCategoryName = [];
    }
    const { categoryName, subCategoryName } =
      dropdownMenuDataWithSubCategory[0];
    return (
      <div className='Dropdown'>
        <ul className='dropdownBox'>
          {dropdownMenuDataWithoutSubCategory.map(dropdownMenu => {
            return (
              <li key={dropdownMenu.id} className='dropdownItem'>
                <div className='dropdownIcon'></div>
                <Link
                  to={`/${dropdownMenu.categoryName}`}
                  className='dropdownLink'
                >
                  {dropdownMenu.categoryName}
                </Link>
              </li>
            );
          })}
          <li className='dropdownItem archiveDropdownItem'>
            <div className='dropdownIcon'></div>
            <Link to='/archievs' className='dropdownLink'>
              {`${categoryName} ⟩`}
            </Link>
            <ul className='archiveMenuBox'>
              {subCategoryName.map(subCategory => {
                return (
                  <li key={subCategory.id} className='archiveMenuItem'>
                    {subCategory.name}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
        <div className='dropdownCardBox'>
          {/* //TODO */}
          <Link to='/todo' className='dropdownLink'>
            <img
              alt='dropdownCardImg'
              className='dropdownCardImg'
              src='https://cdn.shopify.com/s/files/1/0562/4971/2815/files/newsletter_210930_600x.jpg'
            />
          </Link>
          <div className='dropdownCardDescBox'>
            <p className='dropdownCardDescItem'>New FA21 Collection</p>
            <p className='dropdownCardDescItem'>7th Released</p>
            <p className='dropdownCardDescItem'>Available in-store and</p>
            <p className='dropdownCardDescItem'>online 9/30(Thu) 10:00 KST</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
