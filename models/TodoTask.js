// #Component - exported and used in index.js
const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
	// #Property
	// #DatabaseSchema
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);