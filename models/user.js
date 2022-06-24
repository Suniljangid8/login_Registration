const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	
	Firstname:{
	 type:String,
	 required: true,
	},

	Lastname:{
	type:String,
	required: true,
	},

	Mobileno:{
		type:Number,
		required: true,
		unique:true,
	},

	Address:{
		type:String,
		required:true,
	},

	unique_id: {
		type:Number,
	},

	email: {
		type:String,
		required:true,
	},


	username: {
		type:String,
		required:true,
	},

	password: {
		type:String,
		required:true
	},
	passwordConf:{
		type: String,
		required:true,
	},
}),
User = mongoose.model('User', userSchema);

module.exports = User;