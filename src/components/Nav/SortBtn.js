import React, { Component } from 'react';
import SortOptionBox from './SortOptionBox';
import './SortBtn.scss';

class SortBtn extends Component {
  render() {
    const { openSortWindow, closeSortWindow, isSortWindowOn } = this.props;
    return (
      <>
        <div
          onClick={openSortWindow}
          className={`SortBtn ${isSortWindowOn ? 'sortBtnOn' : 'sortBtnNotOn'}`}
        >
          <p className='sortBtntext'>Sort</p>
        </div>
        <SortOptionBox
          closeSortWindow={closeSortWindow}
          isSortWindowOn={isSortWindowOn}
        />
      </>
    );
  }
}

export default SortBtn;
