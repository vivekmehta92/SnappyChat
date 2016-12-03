var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/snappychat");
autoIncrement.initialize(connection);
var u_schema = mongoose.Schema({
	u_id: {type: Number, required: true, index: true},
	fullname: {type: String, required: false},
	username: {type: String, required: true},
	email: {type: String, required: true},
	profile_pic: { tpye: String, required: false},
	about: {type: String, required: false},
	interests: [String],
	account_type: {type: Boolean, required: false},
	profession: {type: String, required: false },
	location: {type: String, required: false},
	thumbnail_profile_pic: { tpye: String, required: false},
	isActive : {type: Boolean, default: false},
	is_active_timeline: {type: Boolean, default: false}
});
u_schema.plugin(autoIncrement.plugin, {
	model: 'user',
    field: 'u_id',
    startAt: 4001,
    incrementBy: 1});
var User = connection.model("user", u_schema);
module.exports = User;