import React, { Component } from 'react';
import FetchMovie from '../actions/fetchMovieAction';
import FetchWeather from '../actions/fetchWeatherAction';
import {bindActionCreators} from 'redux'; 
import {connect} from 'react-redux'; 

class SearchBar extends Component {
	constructor(props){
		super(props); 
		this.state = {
			zipCode: "",
			movieSearch: ""
		}
		this.changeZipCode = this.changeZipCode.bind(this); 
		this.getWeather = this.getWeather.bind(this); 
		this.getMovie = this.getMovie.bind(this); 
		this.changeMovie = this.changeMovie.bind(this); 
	}

	getMovie(event){
		event.preventDefault();
		this.props.FetchMovie(this.state.movieSearch)

	}

	changeMovie(event){
		this.setState({
			MovieSearch: event.target.value
		})
	}

	getWeather(event){
		event.preventDefault();
		console.log(this.state.zipCode); 
		this.props.FetchWeather(this.state.zipCode)
	}

	changeZipCode(event){
		// event.preventDefault();
		this.setState({
			zipCode: event.target.value
		})
	}

	render(){
		console.log(this.props);
		if(this.props.weatherData == null){
			var weatherData = "";
		}else{
			var weatherData = this.props.weatherData.name; 
		}
		if(this.props.movieData == null){
			var movieData = "";
		}else{
			var movieData = this.props.movieData.poster_path; 
		}
		return (
			<div>
				<form onSubmit={this.getWeather}>
					<input placeholder="Enter Zip Code" value={this.state.zipCode} onChange={this.changeZipCode} />
					<button type="submit" className="btn btn-primary">Get the weather</button>
				</form>
				{weatherData}
				<form onSubmit={this.getMovie}>
					<input placeholder="Enter a Movie Name" value={this.state.movieSearch} onChange={this.changeMovie} />
					<button type="submit" className="btn btn-primary">Get the Movies!</button>
				</form>
				{movieData}
			</div>
		);
	}
}



function mapStateToProps(state){
	return{
		weatherData: state.weather

	}
}


//these are getting callbacks from actions
//mapsStatetopProps would get state
function mapDispatchToProps(dispatch){
	return bindActionCreators({FetchWeather: FetchWeather, FetchMovie: FetchMovie}, dispatch);
}


// first arg = state,
//this is a higher order function
//connects props to the dispatch (the searchbar component)  
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar); 













