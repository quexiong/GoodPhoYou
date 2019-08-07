const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//for testing
	const restaurants = [
		{name: "Pho Dalat", image: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/ent_impact_dining/photo/21927497-standard.jpg"},
		{name: "Pho Kim", image: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/ent_impact_dining/photo/21927497-standard.jpg"},
		{name: "Pho Vietnam", image: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/ent_impact_dining/photo/21927497-standard.jpg"},
	];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/restaurants', function(req, res) {
	res.render('restaurants', {restaurants: restaurants});
});

app.post('/restaurants', function(req, res) {
	// get data from form and add to restaurants array, redirect to restaurant page
	const name = req.body.name;
	const image = req.body.image;
	const newRestaurant = {name: name, image: image};
	restaurants.push(newRestaurant);

	res.redirect('/restaurants');
});

app.get('/restaurants/new', function(req, res) {
	res.render('new.ejs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, function(){
	console.log(`server has started on port ${PORT}`);
});