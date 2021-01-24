import React, { Component } from 'react';
import './App.css';
import KanbanBoard from './components/kanban-board/index.js';

const title = "Kanban Board";

class App extends Component {
  render() {
    return (
      < >
        <h2 className="kanban">{title}</h2>
        <KanbanBoard tasks={this.props.tasks}/>
      </ >
    );
  }
}

export default App;
