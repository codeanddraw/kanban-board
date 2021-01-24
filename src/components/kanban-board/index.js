import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
        tasks: this.props.tasks,
        stagesTasks: this.getInitialData()
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  getInitialData = () => {
    let { tasks } = this.props 
    let stagesTasks = []
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }
    return stagesTasks
  }

  compare = (a, b) => {
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  handleBackClick = (task, e) => {
    if(task.stage === 0) return 

    let { stagesTasks } = this.state;
    let newStageTasks = [...stagesTasks]

    let result = newStageTasks[task.stage].filter(item => {
      return !(item.name === task.name)
    });

    newStageTasks.splice(task.stage, 1)
    newStageTasks.splice(task.stage, 0, result)

    let previous = [...newStageTasks[task.stage - 1]]

    previous.push({name: task.name, stage: task.stage - 1})
    previous.sort(this.compare)
    newStageTasks.splice(task.stage - 1, 1)
    newStageTasks.splice(task.stage - 1, 0, previous)
    this.setState({stagesTasks: newStageTasks})
  }

  handleForwardClick = (task, e) => {
    if(task.stage === this.stagesNames.length ) return 

    let { stagesTasks } = this.state;
    let newStageTasks = [...stagesTasks]

    let result = newStageTasks[task.stage].filter(item => {
      return !(item.name === task.name)
    });

    newStageTasks.splice(task.stage, 1)
    newStageTasks.splice(task.stage, 0, result)

    let next = [...newStageTasks[task.stage + 1]]

    next.push({name: task.name, stage: task.stage + 1})
    next.sort(this.compare)
    newStageTasks.splice(task.stage + 1, 1)
    newStageTasks.splice(task.stage + 1, 0, next)
    this.setState({stagesTasks: newStageTasks})
  }
 
  render() {
    const { stagesTasks } = this.state;

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button disabled={task.stage === 0?true: null} onClick={this.handleBackClick.bind(this, task)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                            <i className={`material-icons`}>arrow_back</i>
                                          </button>
                                          <button disabled={task.stage === this.stagesNames.length - 1?true: null} onClick={this.handleForwardClick.bind(this, task)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                            <i className={`material-icons`}>arrow_forward</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}