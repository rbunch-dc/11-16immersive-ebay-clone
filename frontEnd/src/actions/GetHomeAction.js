import $ from 'jquery';

export default function(){
	var thePromise = $.getJSON('http://localhost:3000/getHomeAuctions')
	// console.log(thePromise);
	return{
		type: "GET_HOME",
		payload: thePromise
	}
}