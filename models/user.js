const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

/* let validateEmail = function(email) {
   let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
 */







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

	Street:{
		type:String,
		required:true,
	},
	City:{
		type:String,
		required:true,
	},
	State:{
		type:String,
		required:true,
	},
	Country:{
		type:String,
		required:true,
	},


	unique_id: {
		type:Number,
	},


	email: {
		type: String,
		required : true,
		lowercase : true,
		unique:true,
		validate: { 
		validator:function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},   message: '{email} Invalid' 
		 }
	  },

	/* email: {
		type:String,
		required:true,
		//validate: [validateEmail, 'Please fill a valid email address'],
         //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
   // index: {unique: true, dropDups: true}
   unique:true,
   validate(value){
	if(!validator.isEmail(str)){
		throw new Error("email is invalid");

	}
   }
	},
 */

	username: {
		type:String,
		required:true,
	},

	password: {
		type:String,
		required:true,

	    
	},
	passwordConf:{
		type: String,
		required:true,
	
	},
}),
User = mongoose.model('User', userSchema);

module.exports = User;