import React, {Component} from "react";
import ReactDOM from "react-dom";

import {observable} from 'mobx';
import {observer} from 'mobx-react';

class ObservableContactStore {
    @observable contacts = [];
}

const contactStore = new ObservableContactStore();
// contactStore.contacts = ['Pierre']

class ContactForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newContact: '',
			search:'',
			value: ''
		}
	}
	onChange(e){
		this.setState({
			newContact: e.target.value,
			value: e.target.value
		});
	}
	onSearch(e){
		this.setState({
			search: e.target.value
		});
		this.props.onSearchContact(e.target.value); // La valeur du state n'était pas encore changée
	}
	onSubmit(e){
		e.preventDefault();
		this.props.contactList.push(this.state.newContact);
		this.setState({
			value: ''
		});
	}
	render(){
		return <form onSubmit={this.onSubmit.bind(this)}>
			<input type="text" placeholder="Ajouter un nom" value={this.state.value} onChange={this.onChange.bind(this)}/>
			<input type="search" placeholder="Recherchez un nom" onKeyUp={this.onSearch.bind(this)}/>
			<input type="submit"/>
		</form>
	}
}

@observer
class ListContact extends Component {
	render(){
		
		var contactLists = this.props.contactList.filter((contact, i) => {
				if (contact.indexOf(this.props.onSearch) > -1) {
					return true;
				}
			}).map((contact, i) => {
				return <li key={i}>{contact}</li>
			})			
		return <ul>
			{contactLists}
		</ul>
	}
}

class ContactWrapper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newContact: [],
			onSearch: ''
		}
	}
	onSearchContact(newSearch){
		this.setState({onSearch: newSearch })
	}
	render(){
		console.log(contactStore)
		return <div>
			<ContactForm contactList={contactStore.contacts} onSearchContact={this.onSearchContact.bind(this)} />
			<ListContact contactList={contactStore.contacts} onSearch={this.state.onSearch}/>
		</div>
	}
}

class App extends Component {
	render(){
		return <ContactWrapper />
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
