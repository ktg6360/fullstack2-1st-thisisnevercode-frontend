import React, { Component } from 'react';
import ViewOption from './viewOption';
import './ViewOptionBox.scss';

class ViewOptionBox extends Component {
  state = {
    viewOptionData: [
      { id: 1, name: 'Large', isChecked: false },
      { id: 2, name: 'Small', isChecked: false },
    ],
  };

  handleCheckIcon = id => {
    const viewOptionData = this.state;
    const newViewOptionData = [...viewOptionData];
    newViewOptionData.forEach(data => {
      if (data.id === id) {
        data.isChecked = true;
      } else {
        data.isChecked = false;
      }
    });
    this.setState({ viewOptionData: newViewOptionData });
  };

  onClick = () => {
    const { closeViewWindow } = this.props;
    closeViewWindow();
  };

  render() {
    const { isViewWindowOn } = this.props;
    const { viewOptionData } = this.state;
    return (
      <>
        <div
          className={`viewOptionBoxScrollUp ${
            isViewWindowOn ? 'viewOptionBox' : 'viewWindowInvisible'
          }`}
        >
          <div className='viewOptionHeader'>
            <p className='viewOptionHeaderTitle'>VIEW BY</p>
            <button className='viewOptionCloseBtn' onClick={this.onClick}>
              X
            </button>
          </div>

          <ul className='ViewList'>
            {viewOptionData.map(menu => {
              return (
                <ViewOption
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

export default ViewOptionBox;
