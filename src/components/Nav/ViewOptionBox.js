import React, { Component } from 'react';
import ViewOption from './viewOption';
import './ViewOptionBox.scss';

class ViewOptionBox extends Component {
  onClick = () => {
    const { closeViewModal } = this.props;
    closeViewModal();
  };

  render() {
    const { isViewModalOn, viewOptions, handleViewCheckIcon } = this.props;
    return (
      <div
        className={`viewOptionBoxScrollUp classForViewClose ${
          isViewModalOn ? 'viewOptionBox' : 'viewModalInvisible'
        }`}
      >
        <div className='viewOptionHeader classForViewClose'>
          <p className='viewOptionHeaderTitle classForViewClose'>VIEW BY</p>
          <button className='viewOptionCloseBtn' onClick={this.onClick}>
            X
          </button>
        </div>
        <ul className='ViewList classForViewClose'>
          {viewOptions.map(viewOption => {
            const { isChecked, id, name } = viewOption;
            return (
              <ViewOption
                isChecked={isChecked}
                key={id}
                name={name}
                id={id}
                handleViewCheckIcon={handleViewCheckIcon}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ViewOptionBox;
