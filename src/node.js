var express=require('express');

var app=express();

var bodyParser=require('body-parser');

var mongoose=require('mongoose');

mongoose.connect('mongodb://mern_social:social1@ds147125.mlab.com:47125/mern_social');

var UserSchema = new mongoose.Schema({
	name:String,
	email:String,
	joindate:String,
	posts:Array,
	followers:String,
	following:String
}); 

var User= mongoose.model('User',UserSchema);

var user1=User({name:'Rough1',email:'rough1@gmail.com',joindate:'1 January 2018',posts:[{date:'2 January 2018'},{caption:'Hello guys'},{pic:'post1img.jpg'},{likes:5},{comment:['hi','hey there']}]}).save(function(err){
	if(err) throw err;
});

app.get('/user',function(req,res){

	User.find({},function(err,data){
		if(err) throw err;
		res.send(data);
		console.log(data);
	});
});

app.listen('8080');