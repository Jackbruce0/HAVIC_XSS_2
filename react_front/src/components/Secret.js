import React from 'react';
import axios from 'axios';
import history from '../history'
import { server_ip } from '../constants';

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
		this.commandPage = this.commandPage.bind(this);
	}

	componentDidMount(){
	}

	getFlag(event){
		event.preventDefault()
		const jwt = this.state.jwt
		axios.get("http://"+server_ip+":5000/secret", { headers: { Authorization: `${jwt}` } })
		.then(response=>{
			alert(response.data.message)
		})
		.catch(error=>{
			alert("Nice try funny guy! You ain't no Admin")
		})
	}
	
	viewComments(event){
		event.preventDefault()
		history.push('/comments/')
	}

	commandPage(event){
		event.preventDefault()
		const jwt = this.state.jwt
		axios.get("http://"+server_ip+":5000/secret", { headers: { Authorization: `${jwt}` } })
		.then(response=>{
			history.push('/syscallsub')
		})
		.catch(error=>{
			alert("Nice try funny guy! You ain't no Admin")
		})
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

