import React from 'react';


export default class Robots extends React.Component {
	constructor(props){
		super(props)
	}

	render(){

		return (
	    	<div className="Robots">
	            <text>User-agent: *</text>
				<br/>
				<text alignmentBaseline>Dissallow: /secret/</text>
	    		</div>
	  		);
	}
}