
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , user = require('./routes/user')
  , stories = require('./routes/stories')
  , friends = require('./routes/friends')
  , live = require('./routes/live')
  , notifications= require('./routes/notifications')
  , session = require('client-sessions')
  , index = require('./routes/index')
  , mongoose = require('mongoose')
  , path = require('path');
mongoose.connect('mongodb://localhost/snappychat');
var app = express();
var ejs = require("ejs");
var nodemailer = require("nodemailer");
var moment = require('moment');
var unique = require('array-unique');

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
app.get('/live',function(req, res){
	ejs.renderFile('./views/insert_live.ejs',function(err, result) {
		   if (!err) {
		            res.end(result);
		   }
	   });
});

//All operations on friends.

// This will get triggered when a friend request has to be sent. fields needed= username and friend_username and fullname(the current users fullname)
app.post('/request_friend',friends.request_friend);
// This will get triggered when the friend request is accepted   fields needed= username and friend_username
app.get('/accept_friend',friends.accept_friend);
//get all of user's friends who have addedd the user  			 fields needed= username
app.get('/get_added_friends',friends.get_added_friends); 
// gets all the user's friends that did not add the user(pending sent by user) 	 fields needed= username
app.get('/get_unadded_friends',friends.get_unadded_friends);
// gets all users friend reuqests  									fields needed= username
app.get('/get_friend_requests',friends.get_friend_requests);
// this is to delete friend. Perform this when the user's friend request gets rejected   fields needed= username and friend_username
app.get('/delete_friend',friends.delete_friend);


// All operations on User.

// insert a new user.     									fields needed(all not needed) fullname username email profile_pic profession location about interests account_type thumbnail_profile_pic  is_active
app.post('/insert_user',user.insert_user);
// search if a user exists. During login                    fields needed username
app.get('/check_user',user.check_user);
// list all public users except his friends                 fields needed username  
app.get('/list_other_users',user.list_other_users);
// list all users  							                fields not needed
app.get('/list_all_users',user.list_all_users);  
//change is_active user to false                            fields needed username
app.get('/is_active_false_user',user.is_active_false_user); 
//change is_active user to true                             fields needed username
app.get('/is_active_true_user',user.is_active_true_user);
//update profile pic                                        fields needed username profile_pic
app.get('/update_profile_pic',user.update_profile_pic);
//update account type                                       fields needed username account_type
app.get('/update_account_type',user.update_account_type);
//update thumbnail profile pic                              fields needed username thumbnail_profile_pic     
app.get('/update_thumbail_profile_pic',user.update_thumbail_profile_pic);
//add interests                                             fields needed username interests
app.get('/add_interests',user.add_interests);
//search users on basis the username                        fields needed search
app.get('/search_user_username',user.search_user_username);
//search users on basis the username                         fields needed search
app.get('/search_user_email',user.search_user_email);
//search users on basis the username                          fields needed search
app.get('/search_user_interests',user.search_user_interests);
// edit users profile, update profile 						fields needed(all not needed) fullname username email profile_pic profession location about interests account_type thumbnail_profile_pic  is_active				
app.get('/edit_profile', user.edit_profile);


//All operations on notificaitons table(All chat related stuff)

//Send message to another user.                              fields needed sender receiver type data
app.post('/insert_notification',notifications.insert_notification);
//delete all messages between 2 users.                        fields needed username receiver
app.get('/delete_friend_chat',notifications.delete_friend);
//get all of user's chat with a particular person             fields needed username receiver
app.get('/get_chat',notifications.get_chat);
// get list of all people the user is chatting with           fields needed username
app.get('/list_chats',notifications.list_chats);

//All operations on stories (Timeline related stuff)

//add a stories into timeline (TEXT STORY)                     fields needed username text
app.post('/insert_text_stories',stories.insert_text_stories); 
//post a pictures story into timeline                           fields needed username pictures
app.post('/insert_picture_stories',stories.insert_picture_stories);
// Like a friends story                                             fields needed username s_id
app.get('/like_friend_story',stories.like_friend_story);
//add comments                                                      fields needed username s_id comments
app.get('/add_comments',stories.add_comments);
//list 1 persons timeline                                             fields needed username
app.get('/list_timeline',stories.list_timeline);
//get timeline of all friends of user in order        				 fields needed  username
app.get('/get_timeline', stories.get_Timeline);
//Fetch comments of a particular story 								fields needed s_id
app.get('/fetch_comments', stories.fetch_comments);

//All operations on Live table (live notifications)

// Insert in live (for testing only)                              fields needed username type data
app.post('/insert_live',live.insert_live);
// gets all the user's live unread stuff						fields needed username
app.get('/get_users_live',live.get_users_live);
// list full live database (FOR TESTING ONLY)                   no fields needed
app.get('/list_live',live.list_live);
// this is to delete usernames everything						fields needed username
app.get('/delete_live',live.delete_live);




// app.post('/get_notification',notifications.get_notification);
// app.post('/get_stories',stories.get_stories);

// app.post('/get_user',user.get_user);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
