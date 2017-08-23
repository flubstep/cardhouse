import React, { Component } from 'react';
import './App.css';

import CardEditable from 'components/CardEditable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CardEditable />
      </div>
    );
  }
}

export default App;
