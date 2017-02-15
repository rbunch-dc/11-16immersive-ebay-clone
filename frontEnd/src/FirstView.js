import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';

const photoURL = './placeholderpic.jpg'



class FirstView extends Component{
	render(){
		return(
			<div>
				<div className="col-xs-12 container header">
					<h1>Traveller's Bazaar</h1>
				</div>
				<Navigation/>
				<div className="col-xs-12 container-fluid">
					<h1>Traveller's Bazaar is an international marketplace allowing travellers to share the
					unique treasures they collect on the road with the world</h1>
					<img src={photoURL} alt="placeholder pic"/>
				</div>
				<div className="col-xs-12 container best-examples">
					<h2>See Hot Auctions</h2>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of an auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of an auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of an auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of an auction will go here</h3>
					</div>
				</div>
				<div className="col-xs-12 container shop-by-region-examples">
					<h2>See Regional Auctions</h2>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a regional auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a regional auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a regional auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a regional auction will go here</h3>
					</div>	
				</div>
				<div className="col-xs-12 container shop-by-category-examples">
					<h2>See Goods-Category Auctions</h2>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a good-category auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a good-category auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a good-category auction will go here</h3>
					</div>
					<div className="col-xs-6 col-sm-3">
						<h3>An Example of a good-category auction will go here</h3>
					</div>	
				</div>
			</div>
		)
	}
}

export default FirstView; 