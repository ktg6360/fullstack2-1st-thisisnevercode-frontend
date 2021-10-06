import React, { Component } from 'react';
import ViewOptionBox from './ViewOptionBox';
import './ViewBtn.scss';

class ViewBtn extends Component {
  render() {
    const { openViewModal, isViewModalOn, closeViewModal } = this.props;
    return (
      <>
        <div
          onClick={openViewModal}
          className={`ViewBtn ${isViewModalOn ? 'viewBtnOn' : 'viewBtnNotOn'}`}
        >
          <p className='viewBtntext'>View</p>
        </div>
        <ViewOptionBox
          closeViewModal={closeViewModal}
          isViewModalOn={isViewModalOn}
        />
      </>
    );
  }
}

export default ViewBtn;
