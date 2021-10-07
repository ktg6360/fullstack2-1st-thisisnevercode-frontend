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
