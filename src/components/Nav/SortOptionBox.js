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

  // componentDidMount() {
  //   document.addEventListener('click', this.props.closeSortModal);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.props.closeSortModal);
  // }

  handleCheckIcon = id => {
    const { sortOptions } = this.state;
    const newsortOptions = [...sortOptions];
    newsortOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({ sortOptions: newsortOptions });
  };

  onClick = () => {
    const { closeSortModal } = this.props;
    document.addEventListener('click', this.closeSortModal);
    closeSortModal();
  };

  render() {
    const { isSortModalOn } = this.props;
    const { sortOptions } = this.state;
    return (
      <div
        className={`sortOptionBoxScrollUp ${
          isSortModalOn ? 'sortOptionBox' : 'sortModalInvisible'
        }`}
      >
        <div className='sortOptionHeader'>
          <p className='sortOptionHeaderTitle'>SORT BY</p>
          <button className='sortOptionCloseBtn' onClick={this.onClick}>
            X
          </button>
        </div>
        <ul className='sortList'>
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
