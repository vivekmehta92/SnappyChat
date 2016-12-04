var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/snappychat");
autoIncrement.initialize(connection);
var n_schema = mongoose.Schema({
	n_id: {type: Number, required: true, index: true},
	sender: String,
	receiver: String,
	date: Date,
	notification_type: String,
	data: String
});
n_schema.plugin(autoIncrement.plugin, {
	model: 'notification',
    field: 'n_id',
    startAt: 3001,
    incrementBy: 1});
var Notification = connection.model("notification", n_schema);

module.exports = Notification;