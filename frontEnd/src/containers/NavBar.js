import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SearchAction from '../actions/SearchAction'
import { bindActionCreators } from 'redux'

class BootstrapNavBar extends Component{
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }


    handleSearchSubmit(event){
        event.preventDefault();
        var inputBox = event.target[0].value;
        console.log(inputBox)
        this.props.searchAction(inputBox)
        // this.props.router.push('/search/' + inputBox);
        // this.props.functionFromParent(inputBox);
    }

	render(){
		return(
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Awesome auction site!</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active">
                            <Link to="/">Home</Link>
                        </li>
						<li><Link to="/nowPlaying">Now Playing</Link></li>
						<li><Link to="/topRated">Top Rated</Link></li>
                        <li>
                            <form onSubmit={this.handleSearchSubmit}>
                                <input type="text" placeholder="Search..." />
                                <button type="submit" className="btn btn-success">
                                    Search our auctions
                                </button>
                            </form>
                        </li>
					</ul>
				</div>
			</nav>
		)		
	}
}

function mapStateToProps(state){
    return{
        auctions: state.auctions
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        searchAction: SearchAction
    }, dispatch)
}

// export default BootstrapNavBar;

export default connect(mapStateToProps, mapDispatchToProps)(BootstrapNavBar);
