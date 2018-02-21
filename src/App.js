import React, { Component } from 'react';
import './App.css';

import SquareImageCropper from './components/SquareImageCropper';

const BACKGROUND_URL = '/sam-ferrara-318709.jpg';
const TEST_IMAGE_URL = '/vino.jpg';

class App extends Component {
  render() {
    return (
      <div className="App" style={{
        background: `url(${BACKGROUND_URL})`,
        backgroundSize: 'cover'
      }}>
        <SquareImageCropper
          src={TEST_IMAGE_URL}
        />
      </div>
    );
  }
}

export default App;
