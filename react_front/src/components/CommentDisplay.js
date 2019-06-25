import React from 'react';
import axios from 'axios';

// This component will retrieve all items from comments db and 
// display them

var x = '<html><script>alert("this.is.sparta");</script></html>';

var extractscript=/<script>(.+)<\/script>/gi.exec(x);
x=x.replace(extractscript[0],"");

export default class CommentDisplay extends React.Component {
	constructor(props){
		super(props)
		this.state = {	                	    		
			comments: [],
			error: null
		}
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	componentDidMount(){
		axios.get("http://localhost:2223/comments")
		.then(response=>{
			this.setState({ comments: response.data.comments })
			console.log(response.data.comments)
		})
		.catch(error=>{
			this.setState({ error: "Could not retrieve comments. " })
			console.log(this.state.error)
		});

	//	const script = document.getElementById('myscript').innerHTML
	//	window.eval(script)
	}

	extract_script(value) {
		x = value
		var extractscript1=/<script>(.+)<\/script>/gi.exec(x)
		if (extractscript1 != null) {
			extractscript = extractscript1
			x = x.replace(extractscript[0],"")
			window.eval(extractscript[1])
		}
	}
		
	returnthis(text) {
		return {__html: '<script id="myscript" >console.log(1)</script>'};
	}

	render(){

		return (
	    	<div className="CommentDisplay">
				<fieldset>
					<legend>Comments</legend>
					
					{this.state.comments.map((comment,index) =>
						<div key={comment+index}>
							<strong>{comment.username}: </strong>
							{this.extract_script(comment.text)}							
							<div dangerouslySetInnerHTML={{__html: x}}/>
						</div>
					)}
				</fieldset>
			</div>				
	  		);
	}
}

