import React from 'react';
import ReactDOM from 'react-dom';

import propTypes from 'prop-types';

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

const UserContext = React.createContext();

const Lilist = (props) => {
	return <div>
				<p>Todolist de <strong>{props.user}</strong></p>
				{
					props.todo.map((todos, i) => {
						return <li key={i}>{todos}</li>
					})
				}
			</div>
}

Lilist.propTypes = {
	todo: propTypes.array.isRequired,
	user: propTypes.string.isRequired
}

const NotAdmin = () => {
	return <h1>Vous n'êtes pas admin</h1>
}

const checkAdmin = (WrappedComponent, name) => {
	// return class CheckAdminComponent extends React.Component {
		return (props) => {
			if (props.user === name) {
				return <WrappedComponent {...props} />
			} else {
				return <NotAdmin />
			}
		}
	// }
}

const AdminOnlyLilist = checkAdmin(Lilist, 'admin');

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: ['a', 'b'],
			value: '',
			username: 'admin'
		}
	}

	onTodoChange(e) {
		this.setState({value: e.target.value})
	}

	addTodo(e){
		e.preventDefault()
		this.state.todo.push(this.state.value);
		this.setState({
			todo: this.state.todo,
			value: ''
		});
	}

	render(){
		
		return  <UserContext.Provider value={this.state.username}>
					<div>
						<form onSubmit={this.addTodo.bind(this)}>
							<input type="text" value={this.state.value} onChange={this.onTodoChange.bind(this)}/>
							<input type="submit"/>
						</form>
						<ul>
							<UserContext.Consumer>
								{(user) => <AdminOnlyLilist user={user} todo={this.state.todo}/>}
							</UserContext.Consumer>
							
						</ul>
					</div>
				</UserContext.Provider>
	}
}

const Home = () => {
	return <h1>Home</h1>
}


class App extends React.Component {
	render(){
		return <BrowserRouter>
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/todo">Todo</Link></li>
				</ul>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/todo' component={Todo} />
				</Switch>
			</div>
		</BrowserRouter>
	}
}

ReactDOM.render(<App />, document.getElementById('root'));