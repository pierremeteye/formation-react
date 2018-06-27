// import React, {Component} from "react";
// import ReactDOM from "react-dom";

// // D'abord j'import redux
// import { createStore } from "redux";

// // Va permettre de faire le lien entre react et redux
// import { Provider, connect } from "react-redux";


// // D'abord, on déclare un état initial :
// var initialState = {
// 	contact: []
// }


// // Ensuite on créé un reducer, qui va permettre d'appliquer une action au state, et qui va créer un nouveau state
// const rootReducer = (state = initialState, action) => {
// 	switch (action.type) {
//         case 'ADD_CONTACT':
//             return {...state, contact: [...state.contact, action.payload]};
//         default:
//             return state;
//     }
// };

// // Ensuite on créé le store, qui va prendre en paramètre le reducer
// const store = createStore(rootReducer);

// class ContactForm extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			newContact: '',
// 			search:'',
// 			value: ''
// 		}
// 	}
// 	onChange(e){
// 		this.setState({
// 			newContact: e.target.value,
// 			value: e.target.value
// 		});
// 	}
// 	onSearch(e){
// 		this.setState({
// 			search: e.target.value
// 		});
// 		this.props.onSearchContact(e.target.value); // La valeur du state n'était pas encore changée
// 	}
// 	onSubmit(e){
// 		e.preventDefault();
// 		this.props.onNewContact(this.state.newContact);
// 		this.setState({
// 			value: ''
// 		});
// 	}
// 	render(){
// 		return <form onSubmit={this.onSubmit.bind(this)}>
// 			<input type="text" placeholder="Ajouter un nom" value={this.state.value} onChange={this.onChange.bind(this)}/>
// 			<input type="search" placeholder="Recherchez un nom" onKeyUp={this.onSearch.bind(this)}/>
// 			<input type="submit"/>
// 		</form>
// 	}
// }

// // On va ensuite chercher à lier l'action ADD_CONTACT aux props de nos components. Pour pouvoir lier une action
// // aux props d'un component, on utilise une fonction qui s'appelle mapDispatchToProps.

// const addContact = function(dispatch) {
//     return {
//         onNewContact: function(contact){
//             dispatch({type: 'ADD_CONTACT', payload: contact})
//         }
//     };
// };

// // Ensuite, il faut connecter le component avec le store de Redux. Pour cela, on utilise un HOC
// // Il prend en paramètre le mapDispatchToProps, et ensuite le component.
// const StoreAwareContactForm = connect(null, addContact)(ContactForm);


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// class ListContact extends Component {
// 	render(){
		
// 		// console.log(this.props.onSearch)
// 		var contactLists = this.props.contactList.filter((contact, i) => {
// 			console.log(this.props.onSearch)
// 				if (contact.indexOf(this.props.onSearch) > -1) {
// 					return true;
// 				}
// 			}).map((contact, i) => {
// 				return <li key={i}>{contact}</li>
// 			})			
// 		return <ul>
// 			{contactLists}
// 		</ul>
// 	}
// }

// // mapStateToProps connecte une partie de l'état de Redux et le connecte aux props du Compoenent
// const contactOnly = function(state) {
//     return {contactList: state.contact};
// };

// const StoreAwareContactList = connect(contactOnly)(ListContact);

// class ContactWrapper extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			newContact: [],
// 			onSearch: ''
// 		}
// 	}
// 	addNewContact(newGuy){
// 		this.setState({newContact: [...this.state.newContact, newGuy] })
// 	}
// 	onSearchContact(newSearch){
// 		this.setState({onSearch: newSearch })
// 	}
// 	render(){
// 		return <div>

// 			{/*Pour que les components puissent avoir accès au component, on utilise Provider fourni avec react-redux*/}
// 			<Provider store={store}>
// 				<div>
// 					{/*<ContactForm onNewContact={this.addNewContact.bind(this)} onSearchContact={this.onSearchContact.bind(this)} />*/}
// 					<StoreAwareContactForm />
// 					{/*<ListContact contactList={this.state.newContact} onSearch={this.state.onSearch}/>*/}
// 					<StoreAwareContactList onSearch={this.state.onSearch}/>
// 				</div>
// 			</Provider>
// 		</div>
// 	}
// }

// class App extends Component {
// 	render(){
// 		return <ContactWrapper />
// 	}
// }

// ReactDOM.render(<App/>, document.getElementById('root'));