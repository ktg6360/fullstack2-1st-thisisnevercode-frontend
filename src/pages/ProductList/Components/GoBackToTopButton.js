import React, { Component } from 'react';
import './GoBackToTopButton.scss';

class GoBackToTopButton extends Component {
  handleScrolled = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  render() {
    return (
      <div className='goBackToTopButton'>
        <div className='buttonCenter'>
          <div className='button' onClick={this.handleScrolled}>
            GO BACK TO TOP
          </div>
        </div>
      </div>
    );
  }
}

export default GoBackToTopButton;
