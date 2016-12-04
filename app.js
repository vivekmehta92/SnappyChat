
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
  , session = require('client-sessions')
  , index = require('./routes/index')
  , mongoose = require('mongoose')
  , path = require('path');
mongoose.connect('mongodb://localhost/snappychat');
var app = express();
var ejs = require("ejs");

var app = express();
app.use(session({   
	cookieName: 'session',    
	secret: 'snappychat',    
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,  }));

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

//insert all the things into the table.
app.post('/ins_notification',notifications.insert_notification);
app.post('/ins_stories',stories.insert_stories);
// app.post('/ins_friends',friends.insert_friends);
app.post('/ins_user',user.insert_user);
//All operations on friends
//delete a friend. Like rejecting a friend request
app.get('/delete_friend',friends.delete_friend);
// list of pending requests of the user
app.get('/get_unadded_friends',friends.get_unadded_friends);
//list of friends  that are added.
// app.get('/get_added_friends',friends.get_added_friends);
//call when u wanna accept a friend request
app.get('/accept_friend',friends.accept_friend);
// call when u wanna send a friend request
app.get('/request_friend',friends.request_friend);



// app.post('/get_notification',notifications.get_notification);
// app.post('/get_stories',stories.get_stories);

// app.post('/get_user',user.get_user);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
