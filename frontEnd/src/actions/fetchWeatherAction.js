import $ from 'jquery'; 
//or we could import axios from 'axios' - same as ajax jquery



//this is the callback we are going to request on our searchbar form submit
//it will then call itself to all the reducers. 
//only weatherReducer will change
//weatherReducer will update rootreducer
//rootreducer will change our app

const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=482c145ce8edf1d69ea5168f9d06460c' + '&zip='; 




// actions must return an object 
// the object must have TYPE at very least, payload is optional
export default function GetTheWeather(zipCode){
	console.log("action running!", zipCode);
	const fullWeatherURL = weatherURL+ zipCode; 
	const thePromise = $.getJSON(fullWeatherURL);
	console.log(thePromise); 
	return{
		type: 'getWeather',
		payload: thePromise
	}
}; 