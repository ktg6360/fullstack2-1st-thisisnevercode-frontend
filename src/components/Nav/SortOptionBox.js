import React, { Component } from 'react';
import SortOption from './SortOption';
import './SortOptionBox.scss';

class SortOptionBox extends Component {
  state = {
    sortOptionData: [
      { id: 1, name: 'Recent', isChecked: false },
      { id: 2, name: 'Price (Low)', isChecked: false },
      { id: 3, name: 'Price (High)', isCheckd: false },
      { id: 4, name: 'Trending', isChecked: false },
    ],
  };

  handleCheckIcon = id => {
    const { sortOptionData } = this.state;
    const newSortOptionData = [...sortOptionData];
    newSortOptionData.forEach(data => {
      if (data.id === id) {
        data.isChecked = true;
      } else {
        data.isChecked = false;
      }
    });
    this.setState({ sortOptionData: newSortOptionData });
  };

  onClick = () => {
    const { closeSortWindow } = this.props;
    closeSortWindow();
  };

  render() {
    const { isSortWindowOn } = this.props;
    const { sortOptionData } = this.state;
    return (
      <>
        <div
          className={`sortOptionBoxScrollUp ${
            isSortWindowOn ? 'sortOptionBox' : 'sortWindowInvisible'
          }`}
        >
          <div className='sortOptionHeader'>
            <p className='sortOptionHeaderTitle'>SORT BY</p>
            <button className='sortOptionCloseBtn' onClick={this.onClick}>
              X
            </button>
          </div>

          <ul className='sortList'>
            {sortOptionData.map(menu => {
              return (
                <SortOption
                  isChecked={menu.isChecked}
                  key={menu.id}
                  name={menu.name}
                  id={menu.id}
                  handleCheckIcon={this.handleCheckIcon}
                />
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default SortOptionBox;
