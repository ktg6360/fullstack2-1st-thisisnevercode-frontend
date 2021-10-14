import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { convertToUrlForDropdown } from '../../utils/urlConverter';
import './Dropdown.scss';

class Dropdown extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  render() {
    const { dropdownMenuData } = this.props;
    const dropdownMenuDataWithoutSubCategory = dropdownMenuData.filter(
      data => data.subCategoryName === null
    );
    const dropdownMenuDataWithSubCategory = dropdownMenuData.filter(
      data => data.subCategoryName !== null
    );
    const { categoryName, subCategoryName } =
      dropdownMenuDataWithSubCategory[0];
    return (
      <div className='Dropdown'>
        <ul className='dropdownBox'>
          {dropdownMenuDataWithoutSubCategory &&
            dropdownMenuDataWithoutSubCategory.map(dropdownMenu => {
              const { id, categoryName } = dropdownMenu;
              return (
                <li key={id} className='dropdownItem'>
                  <div className='dropdownIcon'></div>
                  <Link
                    to={`/products/${convertToUrlForDropdown(categoryName)}`}
                    className='dropdownLink'
                  >
                    {categoryName}
                  </Link>
                </li>
              );
            })}
          <li className='dropdownItem archiveDropdownItem'>
            <div className='dropdownIcon'></div>
            <Link
              to={`/${convertToUrlForDropdown(categoryName)}`}
              className='dropdownLink'
            >
              {`${categoryName}`}
            </Link>
            <ul className='archiveMenuBox'>
              {subCategoryName.map(subCategory => {
                const { id, subCategoryName } = subCategory;
                return (
                  <li key={id} className='archiveMenuItem'>
                    <Link
                      to={`/archives/${convertToUrlForDropdown(
                        subCategoryName
                      )}`}
                    >
                      {subCategoryName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
        {/* // ! Link to 속성 해결하기  */}
        <div className='dropdownCardBox'>
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
