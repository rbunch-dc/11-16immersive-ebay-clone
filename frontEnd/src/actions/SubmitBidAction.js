import $ from 'jquery';

export default function(bidAmount, auctionItemId, userToken){
	// Make sure Express Knows Who We Are... From our token
	var bidInfo = {
		bidAmount: bidAmount,
		auctionItemId: auctionItemId,
		userToken: userToken
	}
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/submitBid",
		data: bidInfo
	});
	return{
		type: "SUBMIT_BID",
		payload: thePromise
	}
}