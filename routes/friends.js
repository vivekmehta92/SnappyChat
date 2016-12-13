var Friends = require('./model/friends');
var moment = require('moment');
var Live = require('./model/live');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://vivekmehta92%40gmail.com:Sergioramos123@smtp.gmail.com');


// This will get triggered when a friend request has to be sent.
exports.request_friend = function(req, res){
console.log(req.param("friend_username"));
console.log(req.param("username"));

var friends = new Friends();
			var abc = req.param("friend_username");
			var def = "You have received a friend request from "+req.param("username");
			friends.username = req.param("username");
			friends.friend_username = req.param("friend_username");
			friends.added = "no";
			friends.date = moment().format();
			console.log("2");
			console.log(req.param("friend_username"));
			
			friends.save(function(err, newfriend) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					// console.log(newfriend);
					// res.send(newfriend);
					var live = new Live();
					live.username = req.param("friend_username");
					live.date = moment().format();
					live.type = "friend_request";
					live.data = "You have received a friend request from "+req.param("username");
					live.save(function(err, newnotifys) {
				if(err)
					{
					console.log(err);
					}
				else
					{
						console.log(req.param("friend_username"));
						console.log("4");
					var mailOptions = {
				    from: '"No-Reply(SnappyChat)" <vivekmehta92@gmail.com>', // sender address 
				    to: abc, // list of receivers 
				    subject: 'Friend Request from Snappy Chat', // Subject line 
				    text: def // plaintext body 
				    //html: '<h1>CMPE277 🐴</h1>' // html body 
				};
				// send mail with defined transport object 
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        console.log(error);
				    }
				    console.log('Message sent: ' + info);
				res.send(200);
				});
					// console.log(newnotifys);
					// res.send(newnotifys);
					}
					});				
					}
			});			
};

// This will get triggered when the friend request is accepted
exports.accept_friend = function(req, res){
  Friends.update({ friend_username : req.param("username"), username :  req.param("friend_username")}, { $set: { added: 'yes' }}, { new: true }, function (err, results) {
  if (err) console.log(err);
  // console.log("friend Added");
  // res.send(results);
  else{
  	// var friends = new Friends();
			// friends.username = req.param("username");
			// friends.friend_username = req.param("friend_username");
			// friends.added = "yes";
			// friends.save(function(err, newfriend) {
			// 	if(err)
			// 		{
			// 		console.log(err);
			// 		}
			// 	else
			// 		{
					console.log(results);
					res.send(results);
					}
// 			});	
//   }
});	
};

//get all of user's friends who have addedd him
exports.get_added_friends = function(req, res){
	Friends.find({$or: [{username: req.param("username"), added: "yes" }, {friend_username: req.param("username"), added: { $eq: "yes" }} ]}).exec(function(err, users) {
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

//get all of user's friends who have requested him
exports.get_friend_requests = function(req, res){
	Friends.find({friend_username: req.param("username"), added: "no" }).sort({date: '-1'}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("Pending friend requests are fetched");
				res.send(users);
				}
	});
};

// gets all the user's friends that did not add the user as of now
exports.get_unadded_friends = function(req, res){
	Friends.find({username: req.param("username"), added: { $eq: "no" }}).sort({date: '-1'}).exec(function(err, users) {
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
  Friends.remove({ username : req.param("username"), friend_username : req.param("friend_username") }, function (err, results) {
  if (err) return handleError(err);
  console.log("friend Deleted");
  res.send(results);
});
};