import React from 'react';
import CommentDisplay from './CommentDisplay';
import axios from 'axios';
import { server_ip } from '../constants';

// This component will render CommentDisplay and automatically
// refresh to simiulate active Administrator
// Makes backend request after commments are rendered to 
// ensure the page is not broken do to XSS bafoonery
export default class CommentDisplay_AutoRefresh extends React.Component {

	refresh() {
		window.location.reload();
		axios.get("http://"+server_ip+":5000/commentCheck")
		console.log('get statement passed')


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