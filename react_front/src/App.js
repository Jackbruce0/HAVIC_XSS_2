import React from 'react';
//import axios from 'axios';
import './App.css';
import Login from './components/Login';

export default class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
			//users: [],
		    jwt: null 
		}
		//this.onSubmit = this.onSubmit.bind(this)
	}
	componentDidMount(){
		/*this.setState({
			name: "user@govsec.gov"
		})
		/*axios.get("http://localhost:2223/users")
		.then(response => {
			console.log(response.data.users)	
			this.state({
				users: response.data.users
			})
		})
		.catch(error=>{
			console.log("GetUsers_ERROR")
		})*/

		//Get request for comments
		/*axios.get("http://localhost:2223/login")
		.then(token => {
			console.log(token.data.token)
		})
		.catch(error=>{
			console.log("Authentication_ERROR")
		})*/

	}

	render(){

		//let name = this.state.name
		//let users = this.state.users
		//console.log(users)
		return (
	    	<div className="App">
				<h1>Government Secrets DB</h1>
	            	<h2>Login for access to government secrets.</h2>
					<Login />
	    		</div>
	  		);
	}
}

