var Stories = require('./model/stories');


exports.insert_stories = function(req, res){
	var stories = new Stories();
			stories.username = req.param("username");
			stories.text = req.param("text");
			stories.pictures = req.param("pictures");
			stories.likes = req.param("likes");
			stories.comments = req.param("comments");
			stories.save(function(err, newuser) {
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