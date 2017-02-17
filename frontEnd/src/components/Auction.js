import React,{Component} from 'react';
import {Link} from 'react-router';

class Auction extends Component{
	render(){
		// console.log(this.props.item);
		var auctionItem = this.props.item
		var auctionLink = "/auction/" + auctionItem.id;
		return(
			<div className="home-auction">
				<div className="Title">
					<h1><Link to={auctionLink}>{auctionItem.title}</Link></h1>
				</div>
				<div className="auctionImage">
					<Link to={auctionLink}><img src={auctionItem.url} alt="" /></Link>
				</div>				
			</div>

		);
	}
}

export default Auction;