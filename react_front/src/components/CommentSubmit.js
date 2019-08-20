import React from 'react';
import axios from 'axios';
import { server_ip } from '../constants';

// This component is a text box that will make an entry in the comments
// database

export default class CommentSubmit extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: localStorage.getItem('name'),
			comment: null,
			error: null
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	onSubmit(event){
		event.preventDefault()
		this.setState({ error: null })
		const data = {username: this.state.username, text: this.state.comment}
		console.log(data)
		axios.post("http://"+server_ip+":5000/comment", data)
		.then(response=>{
			console.log(response.data.message)
			this.setState({ error: response.data.message })
		})
		.catch(error=>{
			this.setState({ error: "Comment failed to submit" })
			console.log(this.state.error)
		});

	}

	onChange(event){
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value })
	}

	render(){

		return (
	    	<div className="CommentSubmit">
	                <form action="" id="formTwo">
	                	<fieldset>
							<legend>Comment Field</legend>
	                	    <p>
	                	    	<label>Comment </label>
								<textarea name = "comment"
										  rows = "3" 
										  cols = "80"
				    	                  placeholder="Just tell the truth."
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

