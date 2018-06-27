import React from "react";

import ReactDOM from "react-dom";


class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        };
    }

    addTask(task) {
        this.setState({tasks: [...this.state.tasks, task]});
    }

    render(){
        return <div>
            <this.props.form onNewTask={this.addTask.bind(this)} />
            <this.props.list tasks={this.state.tasks}/>
        </div>
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTask: ''
        };
    }

    onNewTaskChange(e) {
        this.setState({ newTask: e.target.value });
    }

    onSubmitNewTask(e) {
        e.preventDefault();
        this.props.onNewTask(this.state.newTask);
        this.setState({ newTask: "" });
    }

    render() {
        return <form onSubmit={this.onSubmitNewTask.bind(this)}>
            <p>
            <input value={this.state.newTask}
                onChange={this.onNewTaskChange.bind(this)}/>
            <button> Add </button>
            </p>
        </form>
    }
}

const TodoList = props => {
    const liList = props.tasks.map((item, i) => <li key={i}>{item}</li>);
    return <ul {...props}>{liList}</ul>;
};


class App extends React.Component {
  render() {
    return (
      <Todo form={TodoForm} list={TodoList}/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
