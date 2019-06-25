import React from 'react';
import Login from './Login';
import CommentSubmit from './CommentSubmit';
import CommentDisplay from './CommentDisplay';

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: null 
		}
	}
		
	render(){

		return (
	    	<div className="Home">
				<h1>Government Secrets DB</h1>
	            	<h2>Login for access to government secrets.</h2>
					<Login />
					<h3>What do you think of this site?</h3>
					<CommentSubmit />
					<h3>What others think:</h3>
					<CommentDisplay />
	    		</div>
	  		);
	}
}

