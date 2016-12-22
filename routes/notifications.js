var Notification = require('./model/notifications');
var moment = require('moment');
var Live = require('./model/live');
var unique = require('array-unique');

//send message to another user
exports.insert_notification = function(req, res){
	var notification = new Notification();
			notification.sender = req.param("sender");
			notification.receiver = req.param("receiver");
			notification.date = moment().format();
			notification.notification_type = req.param("type");
			notification.data = req.param("data");
			notification.unread = true;
			notification.save(function(err, newnotify) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					var live = new Live();
					live.username = req.param("receiver");
					live.date = moment().format();
					live.type = "notification";
					live.data = "You have received a message from "+req.param("sender");
					live.save(function(err, newnotifys) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newnotifys);
					res.send(newnotifys);
					}
					});				
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
	Notification.find({$or: [{sender: req.param("username"), receiver: req.param("receiver")}, {sender: req.param("receiver"), receiver: req.param("username")}]}).sort({date: '1'}).exec(function(err, users) {
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
	Notification.find({$or: [{sender: req.param("username")}, {receiver: req.param("username")}]}).sort({date: '-1'}).exec(function(err, users) {
		var arr1 = [];
		if(err)
				{
				console.log(err);
				}
			else
				{
					for (var i in users) {
						if(users[i].sender != req.param("username"))
						arr1[i] = users[i].sender;
						else
						arr1[i] = users[i].receiver;
					}
					console.log(unique(arr1)); //=> ['a', 'b', 'c'] 
					console.log(users);	
					res.send(arr1);

					// res.send(JSON.stringify(arr1));
				}
	});
};

function uniqueArray(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j]) 
                a.splice(j--, 1);
        }
    }

    return a;
}
