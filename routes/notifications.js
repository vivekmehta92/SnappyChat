var Notification = require('./model/notifications');
var moment = require('moment');

//send message to another user
exports.insert_notification = function(req, res){
	var notification = new Notification();
			notification.sender = req.param("sender");
			notification.receiver = req.param("receiver");
			notification.date = moment;
			notification.type = req.param("type");
			notification.data = req.param("data");
			notification.save(function(err, newnotify) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newnotify);
					res.send(newnotify);
					}
			});		
};

//delete all messages between 2 users.
exports.delete_friend = function(req, res){
  Notification.remove({$or: [{sender: req.param("username"), receiver: req.param("receiver")}, {sender: req.param("receiver"), receiver: req.param("username")}]}, function (err, results) {
  if (err) return handleError(err);
  console.log("notifications Deleted");
  res.send(results);
});
};

//get all of user's chat with a particular person
exports.get_chat = function(req, res){
	Friends.find({$or: [{sender: req.param("username"), receiver: req.param("receiver")}, {sender: req.param("receiver"), receiver: req.param("username")}]}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("chat Fetched");
				res.send(users);
				}
	});
};

// get list of all people the user is chatting with
exports.list_chats = function(req, res){
	Friends.find({$or: [{sender: req.param("username")}, {receiver: req.param("username")}]}).sort({date: '-1'}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("chat list Fetched");
				res.send(users);
				}
	});
};