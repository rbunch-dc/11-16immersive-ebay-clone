var express = require('express');
var router = express.Router();
var config = require ('../config/config');
var mysql = require('mysql');
var randtoken = require('rand-token');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
connection.connect();

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
	var auctionsQuery = 
		"SELECT * FROM auctions " + 
		"INNER JOIN images ON images.auction_id = auctions.id "
		+ " limit 10";
	connection.query(auctionsQuery, (error, results, fields)=>{
		if (error) throw error;
		res.json(results);
	});
});

// Get a single auction's data based on the ID in teh URL
router.get('/getAuctionItem/:auctionId', (req, res, next)=>{
	var theAuctionId = req.params.auctionId;
	var getAuctionQuery = "SELECT * FROM auctions WHERE id = ?";
	connection.query(getAuctionQuery,[theAuctionId],(error, results, fields)=>{
		res.json(results);
	});
});

// Make a register post route to handle registration!
router.post('/register', (req, res, next)=>{
	checkDupeUserQuery = "SELECT * FROM users WHERE username = ?";
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
	})
});

router.post('/login', (req, res, next)=>{
	var username = req.body.username;
	var password = req.body.password;
	var findUserQuery = "SELECT password FROM users WHERE username = ?";
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
	// res.json(req.body);
});

router.post('/submitBid', (req, res, next)=>{
	res.json(req.body);
})

module.exports = router;
