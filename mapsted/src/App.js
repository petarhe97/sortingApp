import React, { Component } from 'react';
import './App.css';
import 'react-dropdown/style.css';
import MainContainer from './components/main-container.js'

const options = [
  'Numeric Values',
  'String Values'
];

const defaultOption = options[0];

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    )
  }
}

export default App;
