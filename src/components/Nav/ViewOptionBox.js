import React, { Component } from 'react';
import ViewOption from './viewOption';
import './ViewOptionBox.scss';

class ViewOptionBox extends Component {
  state = {
    viewOptions: [
      { id: 1, name: 'Large', isChecked: false },
      { id: 2, name: 'Small', isChecked: false },
    ],
  };
  componentDidMount() {
    document.addEventListener('click', event => {
      if (
        !event.target.getAttribute('class').includes('classForViewClose') &&
        event.target.id !== 'idForViewClose'
      ) {
        this.props.closeViewModal();
      }
      console.log(event.target.id);
      console.log(event.target.className);
    });
  }
  handleCheckIcon = id => {
    const { viewOptions } = this.state;
    const newViewOptions = [...viewOptions];
    newViewOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({ viewOptions: newViewOptions });
  };

  onClick = () => {
    const { closeViewModal } = this.props;
    closeViewModal();
  };

  render() {
    const { isViewModalOn } = this.props;
    const { viewOptions } = this.state;
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
                handleCheckIcon={this.handleCheckIcon}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ViewOptionBox;
