var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET store page */
router.get('/store', function(req, res) {
	var db = req.db;
	var collection = db.collection('shirtscollection');
	collection.find().toArray(function(e, results) {
		res.render('store', {
			'shirtscollection': results
		});
	});
});

module.exports = router;
