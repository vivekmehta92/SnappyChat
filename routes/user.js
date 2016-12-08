var User = require('./model/user');
var Friends = require('./model/friends');

// insert a new user.
exports.insert_user = function(req, res){
	var user = new User();
			user.fullname = req.param("fullname");
			user.username = req.param("username");
			user.email = req.param("email");
			user.profile_pic = req.param("profile_pic");
			user.profession = req.param("profession");
			user.location = req.param("location");
			user.about = req.param("about");
			user.interests = req.param("interests");
			user.account_type = req.param("account_type");
			user.thumbnail_profile_pic = req.param("thumbnail_profile_pic");
			user.isActive = req.param("is_active");
			user.is_active_timeline = req.param("is_active_timeline");
			user.save(function(err, newuser) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newuser);
					res.send(newuser);
					}
			});		
};

// list full users table
exports.list_other_users = function(req, res){
	Friends.find({$or: [{username: req.param("username"), added: "yes" }, {friend_username: req.param("username"), added: { $eq: "yes" }} ]}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
					var f = [];
					for(var i in users)
					{	
						if(users[i].friend_username == req.param("username"))
            			f.push(users[i].username);
            			else	
		         		f.push(users[i].friend_username);
		 			}
		 			f.push(req.param("username"));
					User.find({account_type: "public",username : { $nin: f } }).exec(function(err, users1) {
						if(err)
								{
								console.log(err);
								}
							else
								{
								console.log("List all users done");
								res.send(users1);
								}
					});
				}
	});
};

// search if a user exists. During login
exports.check_user = function(req, res){
	User.find({username: req.param("username")}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("users Fetched");
				//req.session.username = users.username;
				res.send(users);
				}
	});
};

//change is_active user to false
exports.is_active_false_user = function(req, res){
  User.update({ username : req.param("username")}, { $set: { isActive: "false" }}, { new: true }, function (err, results) {
  	if(err)
	{
	console.log(err);
	}
	else
	{
	console.log(results);
	res.send(results);
	}
});		
};

//change is_active user to true
exports.is_active_true_user = function(req, res){
  User.update({ username : req.param("username")}, { $set: { isActive: "true" }}, { new: true }, function (err, results) {
  	if(err)
	{
	console.log(err);
	}
	else
	{
	console.log(results);
	res.send(results);
	}
});		
};

//update profile pic
exports.update_profile_pic = function(req, res){
  User.update({ username : req.param("username")}, { $set: { profile_pic: req.param("profile_pic") }}, { new: true }, function (err, results) {
  	if(err)
	{
	console.log(err);
	}
	else
	{
	console.log(results);
	res.send(results);
	}
});		
};

//update account type
exports.update_account_type = function(req, res){
  User.update({ username : req.param("username")}, { $set: { account_type: req.param("account_type") }}, { new: true }, function (err, results) {
  	if(err)
	{
	console.log(err);
	}
	else
	{
	console.log(results);
	res.send(results);
	}
});		
};

//update thumbnail profile pic
exports.update_thumbail_profile_pic = function(req, res){
  User.update({ username : req.param("username")}, { $set: { thumbnail_profile_pic: req.param("thumbnail_profile_pic") }}, { new: true }, function (err, results) {
  	if(err)
	{
	console.log(err);
	}
	else
	{
	console.log(results);
	res.send(results);
	}
});		
};

//add interests
exports.add_interests = function(req, res){

	var str_interests = req.param("interests");
	var interests = [];
	var len = str_interests.length;

	var commas = [];

	for(i in str_interests){
		if(str_interests[i].charCodeAt() == 44){
			commas.push(i)
		}
	}

	var start = 0;
	var end = len;

	for(i in commas){
		interests.push(str_interests.substring(start,commas[i]).trim())
		start = Number(commas[i]) + 1;
	}
	interests.push(str_interests.substring(start,end).trim())

	for(i in interests){
		User.update({"username": req.param("username")}, {"$push": {"interests": interests[i] }},function(err,results){
			if(err){
				console.log(err)
			}else{
				console.log(results);
				res.send(results);
			}
		});
	}
};

//search users on basis the username
exports.search_user_username = function(req, res){
	User.find({$or: [{username: req.param("search"), account_type: { $eq: "public" }}, {username: req.param("search"), account_type: { $eq: "friends" }} ]}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log(users);
				res.send(users);
				}
	});
};

//search users on basis of the interests
exports.search_user_interests = function(req, res){
	User.find({$or: [{interests: req.param("search"), account_type: { $eq: "public" }}, {interests: req.param("search"), account_type: { $eq: "friends" }} ]}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log(users);
				res.send(users);
				}
	});
};

//search users on basis of email
exports.search_user_email = function(req, res){
	User.find({$or: [{email: req.param("search"), account_type: { $eq: "public" }}, {email: req.param("search"), account_type: { $eq: "friends" }} ]}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log(users);
				res.send(users);
				}
	});
};

//edit user profile
exports.edit_profile = function(req,res){
	var username = req.param("username");
	var phone = req.param("phone");
	var profession = req.param("profession");
	var about = req.param("about");
	var location = req.param("location");

	var image = req.param("image")
	var account_type = req.param("account_type")
	var interests = [];

	if(req.param("interests").length > 0) {
		var str_interests = req.param("interests");
		var len = str_interests.length;

		var commas = [];

		for (i in str_interests) {
			if (str_interests[i].charCodeAt() == 44) {
				commas.push(i)
			}
		}

		var start = 0;
		var end = len;

		for (i in commas) {
			interests.push(str_interests.substring(start, commas[i]).trim())
			start = Number(commas[i]) + 1;
		}
		interests.push(str_interests.substring(start, end).trim())
	}

	User.update({ username : req.param("username")}, { $set: { phone : req.param("phone"),
	profession: req.param("profession"), about: req.param("about"), location: req.param("location"), profile_pic: req.param("image"),
		account_type: req.param("account_type"), interests: interests
	}}, { new: true }, function (err, results) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.send(results);
		}
	});
}