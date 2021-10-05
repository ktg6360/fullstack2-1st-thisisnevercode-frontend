import React, { Component } from 'react';
import ViewOptionBox from './ViewOptionBox';
import './ViewBtn.scss';

class ViewBtn extends Component {
  render() {
    const { openViewWindow, isViewWindowOn, closeViewWindow } = this.props;
    return (
      <>
        <div
          onClick={openViewWindow}
          className={`ViewBtn ${isViewWindowOn ? 'viewBtnOn' : 'viewBtnNotOn'}`}
        >
          <p className='viewBtntext'>View</p>
        </div>
        <ViewOptionBox
          closeViewWindow={closeViewWindow}
          isViewWindowOn={isViewWindowOn}
        />
      </>
    );
  }
}

export default ViewBtn;
