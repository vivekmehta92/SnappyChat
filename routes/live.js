var moment = require('moment');
var Live = require('./model/live');

// Insert in live table
exports.insert_live = function(req, res){
					var live = new Live();
					live.username = req.param("username");
					live.date = moment().format();
					live.type = req.param("type");
					live.data = req.param("data");
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
};

// gets all the user's live unread stuff
exports.get_users_live = function(req, res){
	Live.find({username: req.param("username")}).sort({date: '-1'}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("Users live data Fetched");
				res.send(users);
				}
	});
};

// list full live database
exports.list_live = function(req, res){
	Live.find().sort({date: '-1'}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("all live data Fetched");
				res.send(users);
				}
	});
};

// this is to delete usernames everything
exports.delete_live = function(req, res){
  Live.remove({ username : req.param("username")}, function (err, results) {
  if (err) return handleError(err);
  console.log("live Deleted");
  res.send(results);
});
};
