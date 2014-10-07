shirtshop
=========

FIT14 Web Development Workshop Using Node.js Express &amp; Mongo

#Web Development Introduction

##Getting Started

1. Install [Node.js](http://nodejs.org/)
2. Install [MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)


##Building Shirt Shop

###Express Generator
	npm install express-generator
	mkdir shirtshop
	cd shirtshop
	express
###File Structure

App.js -> Main Controller
routes/index.js -> Other Controllers
views/index.jade -> View
public/images, javascript & stylesheets -> Other Resources

###Starting up the App
	npm install
	npm install -g nodemon
	nodemon
	
###Store Route
Controller

	router.get('/store', function(req, res) {
		res.render('store');
	});
	
View

	extends layout

	block content
  		h1 Shirt Shop
  		p If you give us your money, we will give you shirts :)
  		
Lets go to [localhost:3000/store]()

##Adding Data to Shirt Shop

###Mongo

Add a folder called data in shirtshop.

	mongo
	use shirtshopdb
	db.shirtscollection.insert({'name':'Work Hard Party Harder','image':'http://cdn-s3-3.wanelo.com/product/image/3669190/original.jpg', 'price': '$7'})
	db.shirtscollection.insert({'name':'Do You Even Twerk?','image':'http://www.lookhuman.com/render/product/2507/2507600444850961/2408neopnk-w800h800z1-18403-bro-do-you-even-twerk.jpg', 'price': '$10'})

##Read Data from App View

In store.jade
	
	h1 Store
	each shirt in shirtscollection
		div.shirt-element
			p.name #{shirt.name}
			p.price $#{shirt.price}

			img(src = shirt.image)	
In app.js

	var mongo = require('mongodb');
	var MongoClient = require('mongodb').MongoClient
	...
	app.use(function(req,res,next){    
		MongoClient.connect('mongodb://127.0.0.1:27017/shirtshopdb', function(err, db) {
        	if(err) throw err;
        	req.db = db;
        	next();
    	});
	});
	
In index.js
	
	router.get('/store', function(req, res) {
		var db = req.db;
		var collection = db.collection('shirtscollection');
		collection.find().toArray(function(e, results) {
			res.render('store', {
				'shirtscollection': results
			});
		});
	});

##Creating a new shirt from the app

In store.jade

	  h1 Add a New Shirt to our Store
	  form(name="newshirt", action="/addshirt", method="post")
	  	p Shirt Name
    	input(type="text", name="name")
    	p Price
    	input(type="text", name="price")
    	p Image Url
      	input(type="text", name="url")
      	div
	      	input(type="submit", value="Add New Shirt")

In index.js

	router.post('/addshirt', function(req, res) {
    	var db = req.db;
    	var collection = db.get('shirtscollection');
    	var name = req.body.name;
		var price = req.body.price;
		var image = req.body.url;
    	collection.insert({'name': name,'image': image, 'price': price}, function(err, result) {
			res.redirect('/store');
		});
	});
	
	
Lets add: [](http://cdnpix.com/show/imgs/31c7f3d09905eef25061ee527c150a48_small.jpg)

##Layout

In layout.js

	img.logo(src = '/images/shirtshoplogo.png')

##Adding Styles

	body {
		padding: 50px;
		font: 25px "Arial", Helvetica, sans-serif;
		background-color: #FFFFFF;
		text-align: center;
	}

	a {
	  color: #00B7FF;
	}
	
	/*Logo*/
	img.logo {
		height: 200px;
	}
	
	/*Shirt Element*/
	div.shirt-element img { 
		height: 80%;
		width: 90%;
	}
	
	div.shirt-element { 
		display: inline-block;
		padding: 20px;
		text-transform: uppercase;
		font-size: 16px;
		box-shadow: 2px 2px 5px #888888;
		height: 300px;
		width: 400px;
		margin: 20px;
		font-weight: bold;
	}
	
	div.shirt-element:hover {
		height: 320px;
		margin-top: -10px;
	}
	
	.name {
		width: 50%;
		display: inline-block;
		text-align: left;
	}
	.price { 
		width: 50%;
		display: inline-block;
		text-align: right;
	}
	
	/*Shirt Form*/
	div.new-shirt-form { 
		font-size: 20px;
		padding: 5px;
	}
	
	div.new-shirt-form p {
		margin: 0;
	}
	
	input[type=text] { 
		font-size: 20px;
		margin: 10px 0px;
	}
	input[type=submit] { 
		background-image: url('/images/shirtshopbutton.png');
		background-size: 200px;
		width: 200px;
		height: 66px;
		border: 0px;
		cursor: pointer;
		margin: 5px;
	}
	
	
##What are we missing + Other Resources

1. Add users/login/permissions to add shirts
2. Add sizes/availabilities to the shirts documents
3. Create shopping cart
4. How do we charge for the shirts: [Stripe](https://stripe.com/)
5. Add individual pages for each shirt with details
6. Enable text messages for user notifications [Twilio](http://www.twilio.com/)
7. Deploy [Heroku](https://www.heroku.com/)