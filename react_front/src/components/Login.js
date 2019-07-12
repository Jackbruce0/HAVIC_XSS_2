import React from 'react';
import axios from 'axios';
import history from '../history';
import { server_ip } from '../constants';

export default class Login extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: null,
			password: null,
			jwt: null,
			error: null
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	//Authenticates user (w/ backend) token returned
	// and stored in local storage
	onSubmit(event){
		event.preventDefault()	
		this.setState({ error: null })
		const data = {name: this.state.username, password: this.state.password};
		console.log(data)
		axios.post("http://"+server_ip+":5000/login", data)
		.then(response=>{
			this.setState({ jwt: response.data.token, error: "Login Successful!" })
			localStorage.setItem('jwt', this.state.jwt)
			localStorage.setItem('name', this.state.username)
			console.log(this.state.error)
			
			//upon successful login go to corresponding login page
			if (this.state.username === 'Admin'){
				history.push('/secret/');
			} else {
				history.push('/user/')
			}
		})
		.catch(error=>{
			this.setState({ error: "Login Failed.", jwt: null,
				username: null, password: null})
			localStorage.setItem('jwt', null)
			console.log(this.state.error)
		});

	}

	onChange(event){
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value })
	}

	render(){

		return (
	    	<div className="Login">
	                <form action="" id="formOne">
	                	<fieldset>
							<legend>Login</legend>
	                	    <p>
								<label>Username </label>
	                	        <input type="text" 
	                	               placeholder="user@govsec.gov"
	                	               name="username"
									   onChange={this.onChange}/>
	                	    </p>
	                	    <p>
	                	    	<label>Password </label>
								<input type="password"
				    	               placeholder="Password"
	                	               name="password"
									   onChange={this.onChange}/>
	                	    </p>
	                	    <p>
	                	        <button onClick={this.onSubmit}>
										Submit</button>
	                	    </p>
							<p>
								{this.state.error}
							</p>
	                	</fieldset>
	                </form>
	    		</div>
	  		);
	}
}

