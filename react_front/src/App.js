import React from 'react';
//import axios from 'axios';
import './App.css';
import Home from './components/Home';
import Secret from './components/Secret';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	Switch
} from 'react-router-dom'

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
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/secret" exact component={Secret} />
					</Switch>
				</Router>
			</div>
	  		);
	}
}

