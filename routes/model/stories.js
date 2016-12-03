var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/snappychat");
autoIncrement.initialize(connection);
var s_schema = mongoose.Schema({
	s_id: {type: Number, required: true, index: true},
	username: String,
	text: String,
	pictures: String,
	likes: Number,
	comments: [String],
	timestamp: String
});
s_schema.plugin(autoIncrement.plugin, {
	model: 'storie',
    field: 's_id',
    startAt: 1001,
    incrementBy: 1});
var Stories = connection.model("storie", s_schema);
module.exports = Stories;