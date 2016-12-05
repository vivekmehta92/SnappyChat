
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
var moment = require('moment');

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

//All operations on friends.

// This will get triggered when a friend request has to be sent.
app.post('/request_friend',friends.request_friend);
// This will get triggered when the friend request is accepted
app.get('/accept_friend',friends.accept_friend);
//get all of user's friends who have addedd the user
app.get('/get_added_friends',friends.get_added_friends);
// gets all the user's friends that did not add the user as of now
app.get('/get_unadded_friends',friends.get_unadded_friends);
// this is to delete friend. Perform this when the user's friend request gets rejected
app.get('/delete_friend',friends.delete_friend);


// All operations on User.

// insert a new user.
app.post('/insert_user',user.insert_user);
// search if a user exists. During login
app.get('/check_user',user.check_user);
//change is_active user to false
app.get('/is_active_false_user',user.is_active_false_user);
//change is_active user to true
app.get('/is_active_true_user',user.is_active_true_user);
//update profile pic
app.get('/update_profile_pic',user.update_profile_pic);
//update visibility
app.get('/update_visibility',user.update_visibility);
//update thumbnail profile pic
app.get('/update_thumbail_profile_pic',user.update_thumbail_profile_pic);
//add interests
app.get('/add_interests',user.add_interests);
//search users on basis the username or interests
app.get('/search_user',user.search_user);

//All operations on notificaitons table(All chat related stuff)

//Send message to another user.
app.post('/insert_notification',notifications.insert_notification);
//delete all messages between 2 users.
app.get('/delete_friend',notifications.delete_friend);
//get all of user's chat with a particular person
app.get('/get_chat',notifications.get_chat);
// get list of all people the user is chatting with
app.get('/list_chats',notifications.list_chats);

//All operations on stories (Timeline related stuff)

//add a stories into timeline (TEXT STORY)
app.post('/insert_text_stories',stories.insert_text_stories);
//post a pictures story into timeline
app.get('/insert_picture_stories',stories.insert_picture_stories);
// Like a friends story
app.get('/like_friend_story',stories.like_friend_story);
//add comments
app.get('/add_comments',stories.add_comments);
//list 1 persons timeline
app.get('/list_timeline',stories.list_timeline);





// app.post('/get_notification',notifications.get_notification);
// app.post('/get_stories',stories.get_stories);

// app.post('/get_user',user.get_user);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
