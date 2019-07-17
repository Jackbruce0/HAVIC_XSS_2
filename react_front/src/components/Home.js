import React from 'react';
import Login from './Login';
import history from '../history';

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: localStorage.getItem('jwt') 
		}
		this.goToRegPage = this.goToRegPage.bind(this)
	}

	goToRegPage(event){
		event.preventDefault();
		history.push('/register/')
	}	
		
	render(){

		return (
	    	<div className="Home">
				<h1>Government Secrets DB</h1>
	            	<h2>Login for access to government secrets.</h2>
					<Login />
					<h2>New to the site?</h2>
					<button onClick={this.goToRegPage}>
						Register Here
					</button>
	    		</div>
	  		);
	}
}

