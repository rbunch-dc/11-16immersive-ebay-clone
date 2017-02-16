import React, {Component} from 'react';
import LoginAction from '../actions/LoginAction';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.loginSubmit = this.loginSubmit.bind(this);
	}

	loginSubmit(event){
		event.preventDefault();
		this.props.loginAction({
			username: event.target[0].value,
			password: event.target[1].value
		});		
	}

	render(){
		console.log(this.props.loginResponse);
		var message = ""
		if(this.props.loginResponse.msg === "badUsername"){
			message = "That username does not exist";
		}else if(this.props.loginResponse.msg === "badPassword"){
			message = "That password does not match what we have on file!";
		}else if(this.props.loginResponse.msg === "foundUser"){
			browserHistory.push('/');
		}else{
			message = "";
		}
		return(
			<div>
				<h1>Login Page</h1>
				<h1>{message}</h1>
				<form onSubmit={this.loginSubmit}>
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
					<input type="submit" value="Login!" />
				</form>
			</div>		
		);
	}
}

function mapStateToProps(state){
	return{
		loginResponse: state.login
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: LoginAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Register;