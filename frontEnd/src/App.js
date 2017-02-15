import React, { Component } from 'react';
import './App.css';
import FirstView from './FirstView'; 
import SearchBar from './containers/SearchBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <FirstView />
      </div>
    );
  }
}

export default App;
