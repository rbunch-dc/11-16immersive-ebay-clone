var express = require('express');
var router = express.Router();
var config = require ('../config/config');
var mysql = require('mysql');
var randtoken = require('rand-token');
// Chnage over to pool
var pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
// connection.connect();

var bcrypt = require('bcrypt-nodejs');

// var expressJWT = require('express-jwt');
// var jwt = require('jsonwebtoken');
// var protectMe = expressJWT({secret: 'dc4life'}) 

// var hashedPassword = bcrypt.hashSync("x");
// console.log(hashedPassword);
// var checkHash = bcrypt.compareSync("x", hashedPassword);
// console.log(checkHash);
// checkHash = bcrypt.compareSync("bacon", hashedPassword);
// console.log(checkHash);


/* GET top 10 auctions */
router.get('/getHomeAuctions', function(req, res, next) {
	// var myToken = jwt.sign({username: "Joe"},'dc4life');
	// res.json(myToken);

	// Instead of always using the same connection, we can use a pool of connections.
	// we just grab teh pool (defined above), use it, and then release it back to the pool.
	// The pool is responsible for managing the connections
	// see https://www.npmjs.com/package/mysql#connection-options
	pool.getConnection((err, connection)=> {
	  // connected! (unless `err` is set)
		var auctionsQuery = 
			"SELECT * FROM auctions " + 
			"INNER JOIN images ON images.auction_id = auctions.id "
			+ " limit 10";	  
		connection.query(auctionsQuery, (error, results, fields)=>{
			if (error) throw error;
			res.json(results);
		});
		connection.release()
	});
});

// Get a single auction's data based on the ID in teh URL
router.get('/getAuctionItem/:auctionId', (req, res, next)=>{
	var theAuctionId = req.params.auctionId;
	var getAuctionQuery = "SELECT * FROM auctions WHERE id = ?";
	pool.getConnection((err, connection)=> {	
		connection.query(getAuctionQuery,[theAuctionId],(error, results, fields)=>{
			res.json(results);
		});
		connection.release()
	});
});

// Make a register post route to handle registration!
router.post('/register', (req, res, next)=>{
	checkDupeUserQuery = "SELECT * FROM users WHERE username = ?";
	pool.getConnection((err, connection)=> {
		connection.query(checkDupeUserQuery,[req.body.username],(error,results,fields)=>{
			if(results.length === 0){
				// Go ahead and register this person
				var insertUserQuery = "INSERT INTO users (username, password) VALUES " +
					"(?, ?)";
				connection.query(insertUserQuery,[req.body.username,bcrypt.hashSync(req.body.password)],(error2,results2)=>{
					res.json({
						msg:"userInserted"
					});
				});
			}else{
				res.json({
					msg: "userNameTaken"
				})
			}
		});
		connection.release()
	});
});

router.post('/login', (req, res, next)=>{
	var username = req.body.username;
	var password = req.body.password;
	var findUserQuery = "SELECT password FROM users WHERE username = ?";
	pool.getConnection((err, connection)=> {
		connection.query(findUserQuery,[req.body.username], (error, results, fields)=>{
			if(results.length === 0){
				// This is not a valid username!!!
				res.json({
					msg: "badUsername"
				});
			}else{
				// this is a valid username (we know because results.length > 0);
				checkHash = bcrypt.compareSync(password, results[0].password);
				console.log("######################")
				console.log(checkHash);
				console.log("######################")
				if(checkHash === false){
					res.json({
						msg: "badPassword"
					})
				}else{
					// We have a match on username, and the hash password checks out
					// this is teh droid we're looking for
					var token = randtoken.uid(40);
					insertToken = "UPDATE users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) "+
						"WHERE username=?";
					connection.query(insertToken,[token, username], (error, results)=>{
						console.log(token);
						res.json({
							msg: "foundUser",
							token: token
						});
					});
				}
			}
		});
		connection.release()
	});
	// res.json(req.body);
});

router.post('/submitBid', (req, res, next)=>{
	var selectQuery = "SELECT current_bid,starting_bid FROM auctions WHERE id = ?";
	pool.getConnection((err, connection)=> {
		connection.query(selectQuery,[req.body.auctionItemId],(error,results,fields)=>{
			// res.json(results[0]);

			if((req.body.bidAmount < results[0].current_bid) 
				|| (req.body.bidAmount < results[0].starting_bid)){
				res.json({msg: "bidToLow"});
			}else{
				// Bid has passed server validation... it's high enough! Update MySQL
				// Update the bid_history table, and the auctions table
				// - auctions table
				// 	- high_bidder_id
				// 	- current_bid
				// - bid_history
				// 	- auction_id
				// 	- bidder_id
				// 	- amount

				var getUserId = "SELECT id FROM users WHERE token = ?";
				connection.query(getUserId,[req.body.userToken],(error2,results2)=>{
					if(results2.length > 0){ //Token in the DB, valid token. Move forward
						var updateAuctionsQuery = "UPDATE auctions SET high_bidder_id=?, current_bid=?"+
							"WHERE id = ?";
						connection.query(updateAuctionsQuery,[results2[0].id,req.body.bidAmount,req.body.auctionItemId],(errors3,results3,fields3)=>{
							if(error)throw error;
							res.json({
								msg: "bidAccepted",
								newBid: req.body.bidAmount
							})
						})
					}else{
						res.json({
							msg: "badToken"
						})
					}
				})
			}
		});
		connection.release()
	});
		// bidAmount
		// auctionItemId
		// userToken
	// res.json(req.body);
});

module.exports = router;
