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
            <Link to='/productList' key={text.id}>
              <span>{text.linkName}</span>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default BottomLink;
