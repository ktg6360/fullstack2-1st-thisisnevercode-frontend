import React, { Component } from 'react';
import ImageSlide from './Components/ImageSlide';
import BottomLink from './Components/BottomLink';
import SplashScreen from './Components/SplashScreen';
import './Main.scss';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      firstImages: [],
      secondImages: [],
      bottomLink: [],
    };
  }

  componentDidMount() {
    fetch('/data/Main/firstMainImgData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          firstImages: data,
        });
      })
      .catch(console.log);

    fetch('/data/Main/secondMainImgData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          secondImages: data,
        });
      })
      .catch(console.log);

    fetch('/data/Main/mainBottomLinkData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          bottomLink: data,
        });
      })
      .catch(console.log);
  }

  render() {
    const { firstImages, secondImages, bottomLink } = this.state;

    return (
      <div className='Main'>
        <ImageSlide images={firstImages} />
        <ImageSlide images={secondImages} />
        <BottomLink bottomLink={bottomLink} />
        <SplashScreen />
      </div>
    );
  }
}

export default Main;
