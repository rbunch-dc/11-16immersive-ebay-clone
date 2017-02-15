import React, { Component } from 'react';
import './App.css';
import FirstView from './FirstView'; 
import SearchBar from './containers/SearchBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
