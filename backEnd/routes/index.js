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


/* GET top 10 auctions */
router.get('/getHomeAuctions', function(req, res, next) {
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
	res.json(req.body)
});

module.exports = router;
