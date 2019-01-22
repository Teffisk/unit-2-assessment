var express = require('express');
var app = express();
var db = require('./models');
var layouts = require('express-ejs-layouts');
var ejs = require('ejs');
var parser = require('body-parser');

app.use(parser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/', express.static('static'));
app.use(layouts)

app.get('/', function(req, res){
	res.send('This is the homepage');
});

app.get('/favorites', function(req, res){
	db.animal.findAll()
	.then(function(favorites){
		res.render('favorites', { favorites: favorites })
	})
	.catch(function(err){
		console.log(err);
		res.send('Oh no there was an error, please contact your admin.')
	})
});

app.get('/favorites/new', function(req, res){
	res.render('new');
});

app.post('/favorites', function(req, res){
	db.animal.create({
		species_name: req.body.species_name,
		scientific_name: req.body.scientific_name,
		image_url: req.body.image_url,
		description: req.body.description,
		extinct: req.body.extinct
	})
	.then(function(animal){
		res.redirect('/favorites')
	})
	.catch(function(err){
		console.log(err);
		res.send('Oh no, there was an error adding a new animal!');
	})
})

app.listen(3000);