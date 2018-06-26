

import React from 'react';

import ReactDOM from 'react-dom';


const ItemList = ({items}) => {
    const li_list = items.map((item, i) => <li key={i}>{item}</li>);
    return <ul>{li_list}</ul>;
}

class AutobindInput extends React.Component {

    onChange(e){
        e.preventDefault();
        const {stateAttr, parent} = this.props;
        parent.setState({[stateAttr]: e.target.value});
    }

    render(){
        const {stateAttr, parent} = this.props;
        return <input type="text"
                      onChange={this.onChange.bind(this)}
                      value={parent.state[stateAttr]} />
    }
}


class Todo extends React.Component {

	constructor(props){
        super(props)
		this.state = {
			tasks: [],
			newTask: '',
		}
    }


    onSubmitNewTask(e){
        e.preventDefault();
        this.state.tasks.push(this.state.newTask);
        this.setState({tasks: this.state.tasks, newTask:''})
    }

	render(){
		return <div>
			<form onSubmit={this.onSubmitNewTask.bind(this)}>
				<p>
                    <AutobindInput stateAttr="newTask" parent={this} />
                    <button> Add </button>
                </p>
			</form>
			<ItemList items={this.state.tasks} />
		</div>
	}

}

ReactDOM.render(<Todo/>, document.getElementById("root"));
