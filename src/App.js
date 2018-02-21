import React, { Component } from 'react';
import './App.css';

import SquareImageCropper from './components/SquareImageCropper';

const BACKGROUND_URL = '/sam-ferrara-318709.jpg';
const TEST_IMAGE_URL = '/vino.jpg';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      imageData: null
    };
  }


  hideImage = () => {
    this.setState({ imageData: null });
  }

  onCrop = (imageData) => {
    this.setState({ imageData });
  }

  render() {
    const limiter = Math.min(window.innerHeight, window.innerWidth);
    const height = limiter > 700 ? 600 : 300;
    const width = height;
    const innerSquareSize = width / 3 * 2;
    return (
      <div className="App" style={{
        background: `url(${BACKGROUND_URL})`,
        backgroundSize: 'cover'
      }}>
        {
          this.state.imageData ? (
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              zIndex: 1000,
              color: 'white'
            }}>
              <h2>Cropped Image as PNG data</h2>
              <div>
                <img src={this.state.imageData} style={{ border: '2px solid white' }} />
              </div>
              <button onClick={this.hideImage} className="btn">Close</button>
            </div>
          ) : null
        }
        <SquareImageCropper
          src={TEST_IMAGE_URL}
          height={height}
          width={width}
          innerSquareSize={innerSquareSize}
          onCrop={this.onCrop}
        />
      </div>
    );
  }
}

export default App;
