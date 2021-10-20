import React, { Component } from 'react';
import ViewOptionBox from './ViewOptionBox';
import './ViewBtn.scss';

class ViewBtn extends Component {
  render() {
    const {
      isViewModalOn,
      closeViewModal,
      toggleViewModal,
      viewOptions,
      handleViewCheckIcon,
    } = this.props;
    return (
      <>
        <div
          onClick={toggleViewModal}
          className={`ViewBtn classForViewClose${
            isViewModalOn ? 'viewBtnOn' : 'viewBtnNotOn'
          }`}
        >
          <p className='viewBtntext classForViewClose'>View</p>
        </div>
        <ViewOptionBox
          closeViewModal={closeViewModal}
          isViewModalOn={isViewModalOn}
          viewOptions={viewOptions}
          handleViewCheckIcon={handleViewCheckIcon}
        />
      </>
    );
  }
}

export default ViewBtn;
