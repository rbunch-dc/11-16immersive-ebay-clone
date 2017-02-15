import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegisterAction from '../actions/RegisterAction';

class Register extends Component {
	render(){
		this.props.registerAction({message:"Test"});
		return(
			<div>
				<form>
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="username" placeholder="Password" />
					<input type="submit" value="Register!" />
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		registerAction: RegisterAction
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Register);

// export default Register;