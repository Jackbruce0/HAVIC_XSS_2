import React from 'react';

export default class Secret extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: null 
		}
	}
		
	render(){

		return (
	    	<div className="Secret">
				<h1>This is a secret page</h1>
	    	</div>
	  		);
	}
}

