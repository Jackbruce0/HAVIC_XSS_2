import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: "",
			hashed_password: ""
		}
		this.onSubmit = this.onSubmit.bind(this)
	}
	componentDidMount(){
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
		/*	
		//request works here for some reason
		axios.get("http://localhost:2223/login")
		.then(token => {
			console.log(token.data.token)
		})
		.catch(error=>{
			console.log("Authentication_ERROR")
		})*/

	}

	onSubmit(){
			//This request is succesful, but axios does not think so
		console.log("You clicked submit")
		axios.get("http://localhost:2223/login")
		.then(toke => {
			console.log(toke.data.token)
		})
		.catch(error=>{
			console.log("Authentication_ERROR")
		})
	}

	render(){

		let name = "user@govsec.gov"
		//let users = this.state.users
		//console.log(users)
		return (
	    	<div className="Login">
	                <form action="" id="formOne">
	                	<fieldset>
							<legend>Login</legend>
	                	    <p>
								<label>Username</label>
	                	        <input type="text" 
	                	               placeholder={name}
	                	               name = "username"/>
	                	    </p>
	                	    <p>
	                	    	<label>Password</label>
								<input type = "password"
				    	               placeholder="Password"
	                	               name = "password"/>
	                	    </p>
	                	    <p>
	                	        <button onClick={() => this.onSubmit()}>
										Submit</button>
	                	    </p>
	                	</fieldset>
	                </form>
	    		</div>
	  		);
	}
}

