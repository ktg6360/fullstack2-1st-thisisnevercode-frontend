import React, { Component } from 'react';
import SortOption from './SortOption';
import './SortOptionBox.scss';

class SortOptionBox extends Component {
  onClick = () => {
    const { closeSortModal } = this.props;
    closeSortModal();
  };

  render() {
    const { isSortModalOn, sortOptions, handleSortCheckIcon } = this.props;

    return (
      <div
        className={`sortOptionBoxScrollUp classForSortClose ${
          isSortModalOn ? 'sortOptionBox' : 'sortModalInvisible'
        }`}
      >
        <div className='sortOptionHeader classForSortClose'>
          <p className='sortOptionHeaderTitle classForSortClose'>SORT BY</p>
          <button className='sortOptionCloseBtn' onClick={this.onClick}>
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
                handleSortCheckIcon={handleSortCheckIcon}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SortOptionBox;
