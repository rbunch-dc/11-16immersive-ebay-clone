import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegisterAction from '../actions/RegisterAction';
import formSerialize from 'form-serialize';


class Register extends Component {
	constructor(props) {
		super(props);
		this.registrationSubmit = this.registrationSubmit.bind(this);
		this.state = {
			registrationResponse: ""
		}
	}
	registrationSubmit(event){
		event.preventDefault();
		console.dir(event.target);
		// event.target.childNodes.map((input, index)=>{
		// 	console.log(input.value);
		// })
		// var userName=event.target[0].value;
		// var password=event.target[1].value;
		// this.props.registerAction({message:"Test"});
		// console.log(userName, password);
		this.props.registerAction({
			username: event.target[0].value,
			password: event.target[1].value
		});
	}

	render(){
		// console.log(this.props.registerResponse.msg)
		if(this.props.registerResponse.msg === "userNameTaken"){
			var message = "User Name is Taken";
		}else if(this.props.registerResponse.msg === "userInserted"){
			var message = "User was inserted!";
		}else{
			var message = "";
		}
		return(
			<div>
				<h1>{message}</h1>
				<form onSubmit={this.registrationSubmit}>
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
					<input type="submit" value="Register!" />
				</form>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		registerResponse: state.register
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		registerAction: RegisterAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

// export default Register;