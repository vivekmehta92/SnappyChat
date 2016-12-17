var Stories = require('./model/stories');
var moment = require('moment');
var friend = require('./model/friends');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://vivekmehta92%40gmail.com:Sergioramos123@smtp.gmail.com');

//add a stories into timeline (TEXT STORY)
exports.insert_text_stories = function(req, res){
	var stories = new Stories();
			stories.username = req.param("username");
			stories.text = req.param("text");
			stories.timestamp = moment().format();
			stories.likes = 0;
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
			stories.timestamp = moment().format();
			stories.save(function(err, newstory) {
				if(err)
					{
					console.log(err);
					}
				else
					{
						var mailOptions = {
				    from: '"No-Reply(SnappyChat)" <vivekmehta92@gmail.com>', // sender address 
				    to: 'prashu16k@gmail.com',//req.param("friend_username"), // list of receivers 
				    subject: 'Friend Request from Snappy Chat', // Subject line 
				    text: 'You have received a friend request from'+req.param("username"), // plaintext body 
				    html: '<h1>CMPE277 🐴</h1>' // html body 
				};
				// send mail with defined transport object 
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        console.log(error);
				    }
				    console.log('Message sent: ' + info);
				res.send(200);
				});
					// console.log(newstory);
					// res.send(newstory);
					}
			});		
};

// Like a friends story
exports.like_friend_story = function(req, res){
//add comments
Stories.update({username: req.param("username"),s_id: req.param("s_id")}, {"$push": {likes: req.param("likes")}},function(err,results){
        if(err){
        	console.log(err)
        }else{	
        		console.log(results);
				res.send(results);	
        }
});
//   Stories.find({ username : req.param("username"),s_id: req.param("s_id")}, function (err, results) {
//   if (err) console.log(err);
//   // console.log("friend Added");
//   // res.send(results);
//   else{
//   	console.log(results[0].likes);
//   	var like = parseInt(results[0].likes) + 1;
//   	console.log(like);
//   	Stories.update({ username : req.param("username"),s_id: req.param("s_id")}, { $set: { likes: like }}, { new: true }, function (err, results) {
//   if (err) console.log(err);
//   else{
// 		console.log(results);
// 		res.send(results);
// 	  }
// 	});	
//   }
// });	
};

//add comments
exports.add_comments = function(req, res){
	Stories.update({username: req.param("username"),s_id: req.param("s_id")}, {"$push": {comments: req.param("comments")}},function(err,results){
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
	Stories.find({username: req.param("username")}).sort({timestamp: '-1'}).exec(function(err, users) {
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

//Fetch comments of a particular story
exports.fetch_comments = function(req, res){
	Stories.find({s_id: req.param("s_id")}).sort({timestamp: '-1'}).exec(function(err, users) {
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


exports.get_Timeline = function(req,res){
    // friend.find({username: req.param("username"), added: "yes"}).exec(function(err, users) {
    	friend.find({$or: [{username: req.param("username"), added: "yes" }, {friend_username: req.param("username"), added: "yes"} ]}).exec(function(err, users) {
        if(err)
        {
            console.log(err);
        }
        else
        {
        	console.log(users);
            var userFriends = [];
            for(i in users){
            	if(users[i].friend_username == req.param("username"))
            	userFriends.push(users[i].username);
            	else	
		         userFriends.push(users[i].friend_username);
            }
            console.log(userFriends);
            Stories.find({username: {$in: userFriends }}).sort({timestamp: '-1'}).exec(function(err, stories) {
                if (err) {
                    console.log(err);
                }
                else {
                console.log("stories aya");
                    console.log(stories);
                    res.send(stories);
                }
            });

        }
    });
}