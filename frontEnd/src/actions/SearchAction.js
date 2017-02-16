import $ from 'jquery';

export default function(searchTerm){
	var thePromise = $.getJSON('http://localhost:3000/search/'+searchTerm);
	console.log(searchTerm)

	return{
		type: "SEACH_AUCTIONS",
		payload: thePromise
	}
}