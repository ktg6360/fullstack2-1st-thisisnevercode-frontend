import React, { Component } from 'react';
import SortOptionBox from './SortOptionBox';
import './SortBtn.scss';

class SortBtn extends Component {
  render() {
    const { openSortModal, closeSortModal, isSortModalOn } = this.props;
    return (
      <>
        <div
          onClick={openSortModal}
          className={`SortBtn ${isSortModalOn ? 'sortBtnOn' : 'sortBtnNotOn'}`}
        >
          <p className='sortBtntext'>Sort</p>
        </div>
        <SortOptionBox
          closeSortModal={closeSortModal}
          isSortModalOn={isSortModalOn}
        />
      </>
    );
  }
}

export default SortBtn;
