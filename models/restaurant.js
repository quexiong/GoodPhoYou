'use strict';

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = mongoose.model('Restaurant', restaurantSchema);