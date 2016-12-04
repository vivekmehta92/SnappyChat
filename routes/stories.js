var Stories = require('./model/stories');
var moment = require('moment');

//add a stories into timeline (TEXT STORY)
exports.insert_text_stories = function(req, res){
	var stories = new Stories();
			stories.username = req.param("username");
			stories.text = req.param("text");
			stories.timestamp = moment;
			stories.save(function(err, newstory) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newstory);
					res.send(newstory);
					}
			});		
};

//post a pictures story into timeline
exports.insert_picture_stories = function(req, res){
	var stories = new Stories();
			stories.username = req.param("username");
			stories.pictures = req.param("pictures");
			stories.timestamp = moment;
			stories.save(function(err, newstory) {
				if(err)
					{
					console.log(err);
					}
				else
					{
					console.log(newstory);
					res.send(newstory);
					}
			});		
};

// Like a friends story
exports.like_friend_story = function(req, res){
  Stories.find({ username : req.param("username")}, function (err, results) {
  if (err) return handleError(err);
  // console.log("friend Added");
  // res.send(results);
  else{
  	var like = results.likes + 1;
  	Stories.findByIdAndUpdate({ username : req.param("username")}, { $set: { likes: like }}, { new: true }, function (err, results) {
  if (err) return handleError(err);
  else{
		console.log(results);
		res.send(results);
	  }
	});	
  }
});	
};

//add comments
exports.add_comments = function(req, res){
	Stories.update({username: req.param("username")}, {"$push": {comments: req.param("comments")}},function(err,results){
        if(err){
        	console.log(err)
        }else{	
        		console.log(results);
				res.send(results);	
        }
});
};

//list 1 persons timeline
exports.list_timeline = function(req, res){
	Stories.find({username: req.param("username")}).sort({date: '-1'}).exec(function(err, users) {
		if(err)
				{
				console.log(err);
				}
			else
				{
				console.log("timeline list Fetched");
				res.send(users);
				}
	});
};