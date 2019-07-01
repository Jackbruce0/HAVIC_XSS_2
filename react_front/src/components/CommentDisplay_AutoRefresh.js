import React from 'react';
import CommentDisplay from './CommentDisplay';

// This component will render CommentDisplay and automatically
// refresh to simiulate active Administrator
export default class CommentDisplay_AutoRefresh extends React.Component {
	
	componentDidMount(){
	}

	render(){
		return (
	    	<div className="CommentDisplay_AutoRefresh">
				<CommentDisplay />	
			</div>				
	  		);
	}
}

