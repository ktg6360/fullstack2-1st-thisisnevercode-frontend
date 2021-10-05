import React, { Component } from 'react';
import './GoBackToTopButton.scss';

class GoBackToTopButton extends Component {
  state = {
    isDrag: false,
  };
  handleScrolled = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  isDrag = () => {
    this.setState({
      isDrag: !this.state.isDrag,
    });
  };

  render() {
    const { isDrag } = this.state;
    console.log(isDrag);
    return (
      <div className='goBackToTopButton'>
        <div className='buttonCenter'>
          <div
            className={`button`}
            onClick={this.handleScrolled}
            onDrag={this.handleDragEnter}
          >
            GO BACK TO TOP
          </div>
        </div>
      </div>
    );
  }
}

export default GoBackToTopButton;
