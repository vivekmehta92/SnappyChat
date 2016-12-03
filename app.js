
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , user = require('./routes/user')
  , stories = require('./routes/stories')
  , friends = require('./routes/friends')
  , notifications= require('./routes/notifications')
  , index = require('./routes/index')
  , mongoose = require('mongoose')
  , path = require('path');
mongoose.connect('mongodb://localhost/snappychat');
var app = express();
var ejs = require("ejs");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/user',function(req, res){
	ejs.renderFile('./views/insert_user.ejs',function(err, result) {
		   if (!err) {
		            res.end(result);
		   }
	   });
});
app.get('/notifications',function(req, res){
	ejs.renderFile('./views/insert_notification.ejs',function(err, result) {
		   if (!err) {
		            res.end(result);
		   }
	   });
});
app.get('/stories',function(req, res){
	ejs.renderFile('./views/insert_stories.ejs',function(err, result) {
		   if (!err) {
		            res.end(result);
		   }
	   });
});
app.get('/friends',function(req, res){
	ejs.renderFile('./views/insert_friend.ejs',function(err, result) {
		   if (!err) {
		            res.end(result);
		   }
	   });
});
app.post('/ins_notification',notifications.insert_notification);
app.post('/ins_stories',stories.insert_stories);
app.post('/ins_friends',friends.insert_friends);
app.post('/ins_user',user.insert_user);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
