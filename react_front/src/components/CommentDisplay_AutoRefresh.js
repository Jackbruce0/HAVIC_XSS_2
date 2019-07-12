import React from 'react';
import CommentDisplay from './CommentDisplay';

// This component will render CommentDisplay and automatically
// refresh to simiulate active Administrator
export default class CommentDisplay_AutoRefresh extends React.Component {

	refresh() {
		window.location.reload();
	}
	
	render(){
		
		return (
	    	<div className="CommentDisplay_AutoRefresh">
				<h1>Everyone's a Critic </h1>
				{setInterval(this.refresh, 5000)}
				<CommentDisplay />	
			</div>				
	  		);
	}
}

