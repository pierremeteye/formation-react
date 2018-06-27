import React from "react";

import ReactDOM from "react-dom";

import { Provider, connect } from "react-redux";

import { createStore } from "redux";


// Etat initial
const initialState = {
    todos: []
};


// Reducer
const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, todos: [...state.todos, action.payload]};
        default:
            return state;
    }
};


// Store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


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

// mapDispatchToProps
const addTask = function(dispatch)  {
    return {
        onNewTask: function(task){
            dispatch({type: 'ADD_TASK', payload: task})
        }
    };
};


const StoreAwareTodoForm = connect(null, addTask)(TodoForm);



// LECTURE
const TodoList = props => {
    const liList = props.tasks.map((item, i) => <li key={i}>{item}</li>);
    return <ul {...props}>{liList}</ul>;
};

// mapStateToProps
const tasksOnly = function(state) {
    return {tasks: state.todos};
};

const StoreAwareTodoList = connect(tasksOnly)(TodoList);


class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <div>
            <StoreAwareTodoForm />
            <StoreAwareTodoList />
            </div>
        </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
