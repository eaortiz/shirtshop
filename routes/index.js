var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

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

router.get('/shirt/:id', function(req, res) {
	var db = req.db;
	var collection = db.collection('shirtscollection');
	var shirtId = req.params['id'];
	collection.find({_id: ObjectId(shirtId)}).toArray(function(err, result) {
		res.render('shirt', {'shirt': result[0]});
	});
});

module.exports = router;
