import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BottomLink.scss';

class BottomLink extends Component {
  render() {
    const { bottomLink } = this.props;

    return (
      <div className='bottomLink'>
        {bottomLink.map(text => {
          return (
            <div className='bottomLinkBox' key={text.id}>
              <Link to='/productList'>
                <div className='bottomLinkText'>
                  <span>{text.linkName}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BottomLink;
