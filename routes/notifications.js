var Notification = require('./model/notifications');


exports.insert_notification = function(req, res){
	var notification = new Notification();
			notification.sender = req.param("sender");
			notification.receiver = req.param("receiver");
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