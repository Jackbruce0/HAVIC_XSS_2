import React from 'react';
import Login from './Login';

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: localStorage.getItem('jwt') 
		}
	}
		
	render(){

		return (
	    	<div className="Home">
				<h1>Government Secrets DB</h1>
	            	<h2>Login for access to government secrets.</h2>
					<Login />
	    		</div>
	  		);
	}
}

