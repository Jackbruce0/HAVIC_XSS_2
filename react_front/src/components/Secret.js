import React from 'react';
import axios from 'axios';
import history from '../history'

//Non protected endpoint that contains
//protected "GET FLAG BUTTON" that returns flag value
export default class Secret extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: localStorage.getItem('jwt')
		}
		this.getFlag = this.getFlag.bind(this);
	}

	componentDidMount(){
	}

	getFlag(event){
		event.preventDefault()
		const jwt = this.state.jwt
		axios.get('http://localhost:2223/secret', { headers: { Authorization: `${jwt}` } })
		.then(response=>{
			alert(response.data.message)
		})
		.catch(error=>{
			console.log("Request to /secret failed")
		})
	}
	
	viewComments(event){
		event.preventDefault()
		history.push('/comments/')
	}

	commandPage(event){
		event.preventDefault()
		history.push('/syscallsub')
	}			
		
	render(){

		return (
	    	<div className="Secret">
				<h1>THIS IS A SECRET PAGE</h1>
				<h2>Are you 'Admin'?</h2>
				<button onClick={this.getFlag}>GET FLAG!</button>
				<br/>
				<br/>
				<button onClick={this.viewComments}>View Comments</button>
				<br/>
				<br/>
				<button onClick={this.commandPage}>System Call Submit</button>
	    	</div>
	  		);
	}
}

