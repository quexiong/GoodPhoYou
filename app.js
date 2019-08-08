const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connect_DB = require("./config/db");
const mongoose = require('mongoose');

const Restaurant = require('./models/restaurant.js')

connect_DB();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// Restaurant.create(
// 	{
// 		name: "Pho Dalat 2",
// 		image: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/ent_impact_dining/photo/21927497-standard.jpg"
// 	}, function(err, restaurant){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log('new restaurant:');
// 			console.log(restaurant);
// 		}
// 	});

// 

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/restaurants', function(req, res) {
	// get all restaurants from DB
	Restaurant.find({}, function(err, allRestaurants){
		if(err){
			console.log(err)
		} else{
			res.render("restaurants", {restaurants:allRestaurants});
		}
	});
	// res.render('restaurants', {restaurants: restaurants});
});

app.post('/restaurants', function(req, res) {
	// get data from form and add to restaurants array, redirect to restaurant page
	const name = req.body.name;
	const image = req.body.image;
	const newRestaurant = {name: name, image: image};

	Restaurant.create(newRestaurant, function(err, newCreatedRestaurant){
		if(err){
			console.log(err);
		} else{
			res.redirect('/restaurants');
		}
	});
});

app.get('/restaurants/new', function(req, res) {
	res.render('new.ejs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, function(){
	console.log(`server has started on port ${PORT}`);
});