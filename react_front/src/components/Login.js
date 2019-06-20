import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: null,
			password: null
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	componentDidMount(){

		//request works here for some reason
		/*axios.get("http://localhost:2223/login")
		.then(token => {
			console.log(token.data.token)
		})
		.catch(error=>{
			console.log("Authentication_ERROR")
		})*/

	}

	onSubmit(event){
		//This request is succesful, but axios does not think so
		//That was actually just a firefox thing (safari works)
		/*console.log("You clicked submit")
		axios.get("http://localhost:2223/login")
		.then(toke => {
			console.log(toke.data.token)
		})
		.catch(error=>{
			console.log("Authentication_ERROR")
		})*/
		event.preventDefault()	
		const data = {name: this.state.username, password: this.state.password};
		console.log(data)
		axios.post("http://localhost:2223/login", data);
		
		// Wait for respone (token)
			//return error if no token
		// Use token to get to protected page
	}

	onChange(event){
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value })
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
	                	               name = "username"
									   onChange={this.onChange}/>
	                	    </p>
	                	    <p>
	                	    	<label>Password</label>
								<input type = "password"
				    	               placeholder="Password"
	                	               name = "password"
									   onChange={this.onChange}/>
	                	    </p>
	                	    <p>
	                	        <button onClick={this.onSubmit}>
										Submit</button>
	                	    </p>
	                	</fieldset>
	                </form>
	    		</div>
	  		);
	}
}

