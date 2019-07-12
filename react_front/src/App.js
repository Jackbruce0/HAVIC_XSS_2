import React from 'react';
import './App.css';
import Home from './components/Home';
import Secret from './components/Secret';
import CommentDisplay_AutoRefresh from './components/CommentDisplay_AutoRefresh'
import UserHome from './components/UserHome';
import CommentDisplay_User from './components/CommentDisplay_User';
import SysCallSubmit from './components/SysCallSubmit';
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
			name: localStorage.getItem('name'),
			jwt: localStorage.getItem('jwt'),
		}
	}

	render(){

		return (
	    	<div className="App">
				<Router history={history}>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/secret" exact component={Secret} />
						<Route path="/comments" exact component={CommentDisplay_AutoRefresh} />
						<Route path="/user" exact component={UserHome} />
						<Route path="/usercomments" exact component={CommentDisplay_User} />
						<Route path="/syscallsub" exact component={SysCallSubmit} />
					</Switch>
				</Router>
			</div>
	  		);
	}
}

