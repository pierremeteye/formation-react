import React, {Component} from "react";
import ReactDOM from "react-dom";

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
		this.props.onNewContact(this.state.newContact);
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

class ListContact extends Component {
	render(){
		
		// console.log(this.props.onSearch)
		var contactLists = this.props.contactList.filter((contact, i) => {
			console.log(this.props.onSearch)
				if (contact.indexOf(this.props.onSearch) > -1) {
					return true;
				}
			}).map((contact, i) => {
			// this.props.contactList.filter((e) => {
				// if (e.indexOf(this.props.onSearch) > -1) {
					return <li key={i}>{contact}</li>
				// }
			// })
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
	addNewContact(newGuy){
		this.setState({newContact: [...this.state.newContact, newGuy] })
	}
	onSearchContact(newSearch){
		this.setState({onSearch: newSearch })
	}
	render(){
		return <div>
			<ContactForm onNewContact={this.addNewContact.bind(this)} onSearchContact={this.onSearchContact.bind(this)} />
			<ListContact contactList={this.state.newContact} onSearch={this.state.onSearch}/>
		</div>
	}
}

class App extends Component {
	render(){
		return <ContactWrapper />
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));