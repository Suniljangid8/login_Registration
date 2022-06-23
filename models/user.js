const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	
	Firstname:String,
	Lastname:String,
	Mobileno:Number,
	Address:String,
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;