import React, { Component } from 'react';

import './App.css';
import Todo from './components/Todo/Todo';

class App extends Component {
  render() {
    return (
      <div className="container">
          <h1>To-do list</h1>
          <Todo />
      </div>
    );
  }
}

export default App;
