import React from 'react';
import './App.css';
import Home from './components/Home';
import Secret from './components/Secret';
import CommentDisplay from './components/CommentDisplay'
import {
	Router,
	Route,
	Switch
} from 'react-router-dom'
import history from './history';

export default class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
		    jwt: null 
		}
	}

	render(){

		return (
	    	<div className="App">
				<Router history={history}>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/secret" exact component={Secret} />
						<Route path="/comments" exact component={CommentDisplay} />
					</Switch>
				</Router>
			</div>
	  		);
	}
}

