var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/snappychat");
autoIncrement.initialize(connection);
var l_schema = mongoose.Schema({
	l_id: {type: Number, required: true, index: true},
	username: String,
	friend_fullname: String,
	type: String,
	data: String,
	date: Date
});
l_schema.plugin(autoIncrement.plugin, {
	model: 'live',
    field: 'l_id',
    startAt: 6001,
    incrementBy: 1});
var Live = connection.model("live", l_schema);
module.exports = Live;