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

/*POST new shirt*/
router.post('/newshirt', function(req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.url;
	var db = req.db;
	var collection = db.collection('shirtscollection');
	collection.insert({'name': name, 'price': price, 'image': image}, function(err, result) {
		res.redirect('/store');
	});
});

module.exports = router;
