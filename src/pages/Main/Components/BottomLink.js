import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BottomLink.scss';

class BottomLink extends Component {
  render() {
    const { bottomLink } = this.props;

    return (
      <div className='BottomLink'>
        {bottomLink &&
          bottomLink.map(text => {
            return (
              <div className='bottomLinkBox' key={text.id}>
                <Link to='/products/shoes'>
                  <div className='bottomLinkText'>{text.linkName}</div>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default BottomLink;
