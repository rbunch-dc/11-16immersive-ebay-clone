import $ from 'jquery';

export default function(auctionId){
	console.log(auctionId);
	var thePromise = $.getJSON('http://localhost:3000/getAuctionItem/'+auctionId);
	// console.log(thePromise);
	return{
		type: "GET_AUCTION_DETAIL",
		payload: thePromise
	}
}