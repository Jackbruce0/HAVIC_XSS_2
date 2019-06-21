import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: null,
			password: null,
			error: null
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount(){

	}

	onSubmit(event){
		event.preventDefault()	
		this.setState({ error: null })
		const data = {name: this.state.username, password: this.state.password};
		console.log(data)
		axios.post("http://localhost:2223/login", data)
		.then(response=> {
			console.log(response.data.token)
		})
		.catch(error=>{
			this.setState({ error: "Login Failed." })
			console.log(this.state.error)
		});
		// Use token to get to protected page
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
								<label>Username</label>
	                	        <input type="text" 
	                	               placeholder = "user@govsec.gov"
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
							<p>
								{this.state.error}
							</p>
	                	</fieldset>
	                </form>
	    		</div>
	  		);
	}
}

