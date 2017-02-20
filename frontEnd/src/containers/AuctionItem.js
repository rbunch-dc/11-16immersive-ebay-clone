import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import actions
import GetAuctionDetail from '../actions/GetAuctionDetail';
import SubmitBidAction from '../actions/SubmitBidAction';
// import Auction from '../components/Auction';
import $ from 'jquery';

class AuctionItem extends Component {
	constructor(props) {
		super(props);
		this.submitBid = this.submitBid.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		console.log(nextProps);
	}

	componentDidMount() {
		var auctionId = this.props.params.auctionId;		
		this.props.getThisAuction(auctionId);
	}

	submitBid(event){
		event.preventDefault();
		console.log(this.props.userToken);
		if(localStorage.getItem("token") === undefined){
			// route user to login
		}else{
			var bidAmount = Number(event.target[0].value);
			var auctionItem = this.props.auctionItemDetail[0];
			if(auctionItem.current_bid === 'No Bids Yet'){
				auctionItem.current_bid = Number(auctionItem.starting_bid) - .01;
			}
			if(bidAmount < auctionItem.current_bid){
				console.log("Bid Too Low");
			}else{
				console.log("Submit to Express");
				this.props.submitBidToExpress(bidAmount, auctionItem.id, localStorage.getItem("token"))
			}
		}
	}

	makePayment(){
		console.log("Test");
		var handler = window.StripeCheckout.configure({
			key: 'pk_test_K9L17worNm0z7lHpdssTpwqr',
			locale: 'auto',
			token: function(stripeToken){
				console.log(stripeToken);
				var theData = {
					amount: 10 * 100,
					stripeToken: stripeToken.id,
					token: localStorage.getItem('token')
				}
				$.ajax({
					method: 'POST',
					url: "http://localhost:3000/stripe",
					data: theData
				}).done((data)=>{
					console.log("Express response... and teh response is...")
					console.log(data);
				});
			}
		});
		console.log(handler);
		handler.open({
			name: "Buy stuff from my auction site",
			description: "Pay for your auction",
			amount: 10 * 100,
			image: 'https://www.base64-image.de/build/img/mr-base64-482fa1f767.png'
		})
	}

	render(){
		// this.props.getHomeData();
		// console.log(this.props.bid);
		var message = "";
		if(this.props.auctionItemDetail.length === 0){
			return (<h1>Loading Auction...</h1>);
		}

		var auctionItem = this.props.auctionItemDetail[0];
		if(auctionItem.current_bid === null){
			auctionItem.current_bid = "No Bids Yet";
		}
		if(this.props.bid.msg == "bidAccepted"){
			auctionItem.current_bid = this.props.bid.newBid;
			auctionItem.high_bidder_id = "You are the high bidder!"
		}
		return(
			<div className="auction-detail-page">
				<h1>{auctionItem.title}</h1>
				<p>{auctionItem.desc}</p>
				<p>Current High Bid: {auctionItem.current_bid}</p>
				<p>High Bidder: {auctionItem.high_bidder_id}</p>
				<p>Starting Bid: {auctionItem.starting_bid}</p>
				<form onSubmit={this.submitBid}>
					<input type="number" placeholder="Enter your bid" />
					<button type="submit">Bid</button>
				</form>
				<button className="btn btn-primary" onClick={this.makePayment}>Pay my auction</button>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		auctionItemDetail: state.auctionItem,
		userToken: state.login.token,
		bid: state.bid
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getThisAuction: GetAuctionDetail,
		submitBidToExpress: SubmitBidAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionItem);