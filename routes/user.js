var User = require('./model/user');


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
			user.is_active = req.param("is_active");
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
				req.session.username = users.username;
				res.send(users);
				}
	});
};