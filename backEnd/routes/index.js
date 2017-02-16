var express = require('express');
var router = express.Router();
var config = require ('../config/config');
var mysql = require('mysql');
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

module.exports = router;
