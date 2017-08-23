import React, { Component } from 'react';
import './App.css';

import CardEditable from './components/CardEditable';

const BACKGROUND_URL = '/sam-ferrara-318709.jpg';

class App extends Component {
  render() {
    return (
      <div className="App" style={{
        background: `url(${BACKGROUND_URL})`,
        backgroundSize: 'cover'
      }}>
        <CardEditable />
      </div>
    );
  }
}

export default App;
