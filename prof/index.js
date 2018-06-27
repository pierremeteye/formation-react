

import React from 'react';

import ReactDOM from 'react-dom';


const ItemList = (props) => {
    const li_list = props.items.map((item, i) => <li key={i}>{item}</li>);
    return <ul {...props}>{li_list}</ul>;
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

// HOC: prend un component en paramètre et retourne un component
const withAutoWarning = (WrappedComponent, color) => {
    return class AutoWarningComponent extends React.Component {
        render(){
            const now = new Date();
            let style = {};
            if (now.getDay() % 2 == 0){
                style.color = color;
            }
            console.log(style)
            return <WrappedComponent style={style} {...this.props}  />
        }
    }
}

class Todo extends React.Component {

	constructor(props){
        super(props)
		this.state = {
			tasks: ['a', 'b', 'c'],
			newTask: '',
		}
    }


    onSubmitNewTask(e){
        e.preventDefault();
        this.state.tasks.push(this.state.newTask);
        this.setState({tasks: this.state.tasks, newTask:''})
    }

	render(){
        const AutoWarningItemList = withAutoWarning(ItemList, 'red');
		return <div>
			<form onSubmit={this.onSubmitNewTask.bind(this)}>
				<p>
                    <AutobindInput stateAttr="newTask" parent={this} />
                    <button> Add </button>
                </p>
			</form>
			<AutoWarningItemList items={this.state.tasks} />
		</div>
	}

}

ReactDOM.render(<Todo/>, document.getElementById("root"));
