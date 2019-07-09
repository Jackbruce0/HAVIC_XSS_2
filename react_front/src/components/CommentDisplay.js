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

		this.get_Comments();
		
	}

	get_Comments(){
		axios.get("http://10.0.2.15:5000/comments")
		.then(response=>{
			this.setState({ comments: response.data.comments })
		})
		.catch(error=>{
			this.setState({ error: "Could not retrieve comments. " })
			console.log(this.state.error)
		});
		console.log('yes');
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

