import React from 'react';
import axios from 'axios';
import CommentSubmit from './CommentSubmit'
import history from '../history'
import {server_ip} from '../constants'

//Home page for every non Admin user
export default class UserHome extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
			jwt: localStorage.getItem('jwt'), 
			message: null
		}
		this.refreshComments = this.refreshComments.bind(this);
	}

	componentDidMount(){
	}

	
	viewComments(event){
		event.preventDefault()
		history.push('/usercomments/')
	}

	refreshComments(event){
		event.preventDefault()
		const jwt = localStorage.getItem('jwt')
		axios.get("http://"+server_ip+":5000/usercomments_delete", { headers: { Authorization: `${jwt}` } })
		.then(response=>{
			this.setState({ message : response.data.message })
		})
		.catch(error=>{
			this.setState({ error: "Something bad happened... like really bad" })
			console.log(this.state.error)
		});
	}
		
	render(){

		return (
	    	<div className="UserHome">
				<h1>Hello there! No secrets going on here.</h1>
				<h2>I hear the  'Admin' keeps them all to herself.</h2>
				<br/>
				<h2>What do you think about this site?</h2>	
				<CommentSubmit />
				<br/>
				<button onClick={this.viewComments}>View Comments</button>
				<h3>Did you mess up your comments?</h3>
				<button onClick={this.refreshComments}>Refresh Comment DB</button>
				<br/>
				{this.state.message}
	    	</div>
	  		);
	}
}

