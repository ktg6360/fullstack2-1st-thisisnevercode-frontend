import React, { Component } from 'react';
import SortOption from './SortOption';
import './SortOptionBox.scss';

class SortOptionBox extends Component {
  state = {
    sortOptions: [
      { id: 1, name: 'Recent', isChecked: false },
      { id: 2, name: 'Price (Low)', isChecked: false },
      { id: 3, name: 'Price (High)', isCheckd: false },
      { id: 4, name: 'Trending', isChecked: false },
    ],
  };

  //!!!!!Fix!!!!!!!
  componentDidMount() {
    document.addEventListener('click', event => {
      const hasSameClassOrIdForSort =
        !event.target.getAttribute('class').includes('classForSortClose') &&
        event.target.id !== 'idForSortClose';
      if (hasSameClassOrIdForSort) {
        this.props.closeSortModal();
      }
    });
  }

  handleCheckIcon = id => {
    const { sortOptions } = this.state;
    const newsortOptions = [...sortOptions];
    newsortOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({ sortOptions: newsortOptions });
  };

  onClick = () => {
    const { closeSortModal } = this.props;
    closeSortModal();
  };

  render() {
    const { isSortModalOn } = this.props;
    const { sortOptions } = this.state;
    return (
      <div
        className={`sortOptionBoxScrollUp classForSortClose ${
          isSortModalOn ? 'sortOptionBox' : 'sortModalInvisible'
        }`}
      >
        <div className='sortOptionHeader classForSortClose'>
          <p className='sortOptionHeaderTitle classForSortClose'>SORT BY</p>
          <button className='sortOptionCloseBtn ' onClick={this.onClick}>
            X
          </button>
        </div>
        <ul className='sortList classForSortClose'>
          {sortOptions.map(sortOption => {
            const { isChecked, id, name } = sortOption;
            return (
              <SortOption
                isChecked={isChecked}
                key={id}
                name={name}
                id={id}
                handleCheckIcon={this.handleCheckIcon}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SortOptionBox;
