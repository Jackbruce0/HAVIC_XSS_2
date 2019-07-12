import React from 'react';
import axios from 'axios';
import CommentSubmit from './CommentSubmit'
import history from '../history'

//Home page for every non Admin user
export default class UserHome extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: localStorage.getItem('jwt')
		}
		// this.getFlag = this.getFlag.bind(this);
	}

	componentDidMount(){
	}

	// getFlag(event){
	// 	event.preventDefault()
	// 	const jwt = this.state.jwt
	// 	axios.get('http://'+server_ip+':5000/secret', { headers: { Authorization: `${jwt}` } })
	// 	.then(response=>{
	// 		alert(response.data.message)
	// 	})
	// 	.catch(error=>{
	// 		console.log("Request to /secret failed")
	// 	})
	// }
	
	viewComments(event){
		event.preventDefault()
		history.push('/usercomments/')
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
	    	</div>
	  		);
	}
}

