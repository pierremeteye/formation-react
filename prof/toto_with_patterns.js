import React from "react";

import ReactDOM from "react-dom";

import PropTypes from "prop-types";

import { BrowserRouter, Route, Link } from "react-router-dom";

const ItemList = props => {
  const li_list = props.items.map((item, i) => <li key={i}>{item}</li>);

  return (
    <div>
      <p>
        Items de : <strong>{props.user.username}</strong>
      </p>
      <ul {...props}>{li_list}</ul>
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

class AutobindInput extends React.Component {
  onChange(e) {
    e.preventDefault();
    const { stateAttr, parent } = this.props;
    parent.setState({ [stateAttr]: e.target.value });
  }

  render() {
    const { stateAttr, parent } = this.props;
    return (
      <input
        type="text"
        onChange={this.onChange.bind(this)}
        value={parent.state[stateAttr]}
      />
    );
  }
}

// HOC: prend un component en paramètre et retourne un component
const withAutoWarning = (WrappedComponent, color) => {
  return class AutoWarningComponent extends React.Component {
    render() {
      const now = new Date();
      let style = {};
      if (now.getDay() % 2 == 0) {
        style.color = color;
      }
      return <WrappedComponent style={style} {...this.props} />;
    }
  };
};

const UserContext = React.createContext();

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: ["a", "b", "c"],
      newTask: "",
      user: {
        username: "admin"
      }
    };
  }

  onSubmitNewTask(e) {
    e.preventDefault();
    this.state.tasks.push(this.state.newTask);
    this.setState({ tasks: this.state.tasks, newTask: "" });
  }

  render() {
    const AutoWarningItemList = withAutoWarning(ItemList, "red");
    return (
      <UserContext.Provider value={this.state.user}>
        <form onSubmit={this.onSubmitNewTask.bind(this)}>
          <p>
            <AutobindInput stateAttr="newTask" parent={this} />
            <button> Add </button>
          </p>
        </form>
        <UserContext.Consumer>
          {user => <AutoWarningItemList items={this.state.tasks} user={user} />}
        </UserContext.Consumer>
      </UserContext.Provider>
    );
  }
}

const Home = () => {
  return <h1>HOME !!!</h1>;
};

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/todo" component={Todo} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
