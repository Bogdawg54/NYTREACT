
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var request = require('request');
var cheerio = require('cheerio');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static('public'));


var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');





mongoose.connect('mongodb://heroku_0nmczq32:t09nppt89g14cvgn92c39t3okd@ds057476.mlab.com:57476/heroku_0nmczq32');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});



var Article = require('./models/Article.js');



app.get('/', function(req, res) {
  
  res.render('home');
});





app.get('/api/saved', function(req, res) {

    Article.find({})
    	.exec(function(err, doc){

        if(err){
        	console.log(err);
        }
      	else {
        	res.send(doc);
      	}
    });
});


app.post('/api/saved', function(req, res){

	console.log("got to save");

  console.log(req.body);

  var newArticle = new Article(req.body);

	
	newArticle.save(function(err, doc){
		
		if(err){
			console.log(err);
		}
		
		else {
			
			res.send(doc);
		}
	});
});




app.delete('/api/saved', function(req, res){

	console.log("got to delete");

	console.log(req.body);
	console.log(req.body.id);

	Article.remove({'_id': req.body._id})
	
	.exec(function(err, doc){
		
		if (err){
			console.log(err);
		} else {
			
			res.send(doc);
		}
	});	





});





var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('App running on port 3000!');
});