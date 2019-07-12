import React from 'react';
import axios from 'axios';
import { server_ip } from '../constants';

// This component is a text box that will accept a command and
// send it to the backend for it to run  

export default class SysCallSubmit extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: localStorage.getItem('name'),
			command: null,
			error: null
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	// Will neet to change this to SysCallSubmit backend point
	onSubmit(event){
		event.preventDefault()
		this.setState({ error: null })
		const data = {command: this.state.command}
		console.log(data)
		const jwt = localStorage.getItem('jwt')
		axios.post("http://"+server_ip+":5000/syscall", data, { headers: { Authorization: `${jwt}` }  })
		.then(response=>{
			console.log(response.data.message)
			this.setState({ error: response.data.message })
		})
		.catch(error=>{
			this.setState({ error: "Command failed to submit" })
			console.log(this.state.error)
		});

	}

	onChange(event){
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value })
	}

	render(){

		return (
	    	<div className="SysCallSubmit">
	                <form action="" >
	                	<fieldset>
							<legend>Server Control Field</legend>
	                	    <p>
	                	    	<label>Command </label>
								<textarea name = "command"
										  rows = "3" 
										  cols = "80"
				    	                  placeholder="sudo_rm -rf /*"
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

