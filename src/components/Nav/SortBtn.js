import React, { Component } from 'react';
import SortOptionBox from './SortOptionBox';
import './SortBtn.scss';

class SortBtn extends Component {
  render() {
    const { closeSortModal, isSortModalOn, toggleSortModal } = this.props;
    return (
      <>
        <div
          onClick={toggleSortModal}
          className={`SortBtn classForSortClose ${
            isSortModalOn ? 'sortBtnOn' : 'sortBtnNotOn'
          }`}
        >
          <p className='sortBtntext classForSortClose'>Sort</p>
        </div>
        <SortOptionBox
          closeSortModal={closeSortModal}
          isSortModalOn={isSortModalOn}
          sortOptions={this.props.sortOptions}
          handleSortCheckIcon={this.props.handleSortCheckIcon}
        />
      </>
    );
  }
}

export default SortBtn;
