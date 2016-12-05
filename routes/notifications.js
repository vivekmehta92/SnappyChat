var Notification = require('./model/notifications');
var moment = require('moment');

//send message to another user
exports.insert_notification = function(req, res){
	var notification = new Notification();
			notification.sender = req.param("sender");
			notification.receiver = req.param("receiver");
			notification.date = moment().format();
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
  if (err) console.log(err);
  console.log("notifications Deleted");
  res.send(results);
});
};

//get all of user's chat with a particular person
exports.get_chat = function(req, res){
	Notification.find({$or: [{sender: req.param("username"), receiver: req.param("receiver")}, {sender: req.param("receiver"), receiver: req.param("username")}]}).sort({date: '-1'}).exec(function(err, users) {
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
	Notification.distinct('sender', {$or: [{sender: req.param("username")}, {receiver: req.param("username")}]}).exec(function(err, users) {
		var arr1 = [];
		if(err)
				{
				console.log(err);
				}
			else
				{
					for (var i = 0; i < users.length; i++) {
						arr1[i] = users[i];
					}
					Notification.distinct('receiver', {$or: [{sender: req.param("username")}, {receiver: req.param("username")}]}).exec(function(err, users1) {
					var user = [];
					if(err)
					{
					console.log(err);
					}
					else
					{
						for(var i in users1){
    					if(users1[i]==req.param("username")){
        				users1.splice(i,1);
        				break;
        				}
						}
					res.send(users1.reverse());
					}
					});				
				}
	});
};