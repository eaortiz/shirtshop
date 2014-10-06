var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET store page */
router.get('/store', function(req, res) {
    res.render('store');
});

module.exports = router;
