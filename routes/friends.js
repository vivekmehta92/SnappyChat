var Friends = require('./model/friends');


// This will get triggered when a friend request has to be sent.
exports.request_friend = function(req, res){
var friends = new Friends();
			friends.username = req.param("username");
			friends.friend_username = req.param("friend_username");
			friends.added = "no";
			friends.save(function(err, newfriend) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newfriend);
					res.send(newfriend);
					}
			});			
};

// This will get triggered when the friend request is accepted
exports.accept_friend = function(req, res){
  Friends.findByIdAndUpdate({ username : req.param("friend_username"), friend_username :  req.param("username")}, { $set: { added: 'yes' }}, { new: true }, function (err, results) {
  if (err) return handleError(err);
  // console.log("friend Added");
  // res.send(results);
  else{
  	var friends = new Friends();
			friends.username = req.param("username");
			friends.friend_username = req.param("friend_username");
			friends.added = "yes";
			friends.save(function(err, newfriend) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newfriend);
					res.send(newfriend);
					}
			});	
  }
});	
};

//get all of user's friends who have addedd him
exports.get_added_friends = function(req, res){
	Friends.find({$or: [{username: req.session.username, added: { $eq: "yes" }}, {friend_username: req.session.username, added: { $eq: "yes" }} ]}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("friends that added the user are Fetched");
				res.send(users);
				}
	});
};

// gets all the user's friends that did not add the user as of now
exports.get_unadded_friends = function(req, res){
	Friends.find({username: req.session.username, added: { $eq: "no" }}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("friends that have not added the user are Fetched");
				res.send(users);
				}
	});
};

// this is to add a new friend.
// exports.add_friend = function(req, res){
// Friends.findByIdAndUpdate({ username : req.param("username"), friend_username : req.param("friend_username") }, { $set: { added: 'yes' }}, { new: true }, function (err, results) {
// if (err) return handleError(err);
// console.log("friend Added");
// res.send(results);
// });	
// };

// this is to delete friend. Perform this when the user's friend request gets rejected
exports.delete_friend = function(req, res){
  Friends.remove({ username : req.param.username, friend_username : req.param("friend_username") }, function (err, results) {
  if (err) return handleError(err);
  console.log("friend Deleted");
  res.send(results);
});
};