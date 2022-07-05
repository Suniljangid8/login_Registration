var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/', function(req, res, next) {
	console.log(req.body);
	let personInfo = req.body;

	if(!personInfo.Firstname || !personInfo.Lastname || !personInfo.Mobileno || !personInfo.Address ||   !personInfo.Street || !personInfo.City || !personInfo.State || !personInfo.Country || !personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},(err,data)=>{
				if(!data){
					var c;
					User.findOne({},(err,data)=>{

						if (data) {
							console.log("data");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							Firstname:personInfo.Firstname,
							Lastname:personInfo.Lastname,
							Mobileno:personInfo.Mobileno,
							Address:personInfo.Address,
							Street:personInfo.Street,
							City:personInfo.City,
							State:personInfo.State,
							Country:personInfo.Country,
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save((err, Person)=>{
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', (req, res, next)=> {
	return res.render('login.ejs');
	
});

router.post('/login', (req, res, next)=> {
	
	User.findOne({email:req.body.email},(err,data)=>{
		if(data){
			
			if(data.password==req.body.password){
				
				req.session.userId = data.unique_id;
				
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/profile', (req, res, next)=> {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},(err,data)=>{
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			
			return res.render('data.ejs', { 
				"Firstname":data.Firstname,
				"Lastname":data.Lastname,
				"Mobileno":data.Mobileno,
				"Address":data.Address,
				"Street":data.Street,
				"City":data.City,
				"State":data.State,
				"Country":data.Country,
				"name":data.username,"email":data.email });
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router;