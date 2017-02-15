import $ from 'jquery'; 
//or we could import axios from 'axios' - same as ajax jquery



//this is the callback we are going to request on our searchbar form submit
//it will then call itself to all the reducers. 
//only weatherReducer will change
//weatherReducer will update rootreducer
//rootreducer will change our app


// var movieURL = 'https://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query=superman';

const APIKEY = 'fec8b5ab27b292a68294261bb21b04a5';
const MovieURL = 'https://api.themoviedb.org/3/search/movie?api_key='+APIKEY+'&query=';


// actions must return an object 
// the object must have TYPE at very least, payload is optional
export default function GetTheMovies(movieSearchString){
	console.log("action running!", movieSearchString);
	const fullMovieURL = MovieURL+ movieSearchString; 
	const thePromise = $.getJSON(MovieURL);
	console.log(thePromise); 
	return{
		type: 'getMovies',
		payload: thePromise
	}
}; 