const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
	hobbies: {
		type: Array
	},
	address: {
		type: String
	}
})

module.exports = mongoose.model('User', userSchema)