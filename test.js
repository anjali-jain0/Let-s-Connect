var express=require('express');

var request = require('request');

var webpush=require('web-push');

var path=require('path');

var app=express();

var bodyParser=require('body-parser');

//var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var mongoose=require('mongoose');

const timestamp = require('mongoose-timestamp');

mongoose.connect('mongodb://localhost/mern_social');

var db = mongoose.connection;

var PostSchema = new mongoose.Schema({
	email:String,
	by:String,
	date : String , 
	caption : String , 
	pic : String , 
	likes : Number ,
	comment : Array
});

var GroupSchema = new mongoose.Schema({
	//email:String,
	name : String ,
	pic : String , 
	about : String,
	members : Array , 
	gallery : Array , 
	//posts : PostSchema , 
	admin : String
});

GroupSchema.plugin(timestamp);

var UserSchema = new mongoose.Schema({
	name:String,
	email:String,
	msgs:Array,
	img:String,
	joindate:String,
	followers:Array,
	following:Array,
	password:Number,
	initials:String,
	joingrp:Array,
	// group : GroupSchema,
	taged : Array,
	shared : Array,
	// posts : PostSchema
}); 


var User = mongoose.model('User' , UserSchema , 'User');
var Post = mongoose.model('Post' , PostSchema , 'Post');
var Group = mongoose.model('Group' , GroupSchema , 'Group');
//var bookmarked = mongoose.model('Bookmarked' , PostSchema , 'Bookmarked');

app.get('/user',function(req,res){

	User.find({},function(err,data){
		if(err) throw err;
		res.send(data);
	});
});

app.get('/userposts/:id' , function(req,res){

		User.find({_id:req.params.id})
		.then(data => {
			var email=data[0].email;
			return Post.find({email:email});
		})
		.then(data => {
			res.send(data);
		});
			
});

app.get('/user/:id',function(req,res){

	User.find({_id:req.params.id},function(err,data){
		if(err) throw err;
		//console.log('stage1' + data);
		res.send(data);
	});
});

app.get('/user/:email/:pwd',function(req,res){
	
	var query={email:req.params.email,password:req.params.pwd};
	User.find(query,function(err,data){
		if(err) throw err;
		res.json(data[0]);
	});
	
});

app.get('/directuser/:pwd' , function(req,res){

	var query={password:req.params.pwd};
	User.find(query,function(err,data){
		if(err) throw err;
		res.json(data[0]);
	}); 
});

//??what is this

// app.post('/newuser/:txt',function(req,res){

// 	var user3= User({name:'usr3',email:'usr3@gmail.com',joindate:new Date(),posts:
// 		[{date:new Date(),caption:req.params.txt,likes:'0',comment:[],pic:''}],following:[],followers:[]}).save(function(err){
// 		if(err) throw err;
// 	});
// 	res.redirect('/user');
// });

//what are these 2 ??

// app.post('/liked/:uid',function(req,res){
 
// 	var query={_id:req.params.uid};
// 	User.find(query,function(err,data){
// 		if(err) throw err;
// 		var n=Number(data[0].posts[0].likes)+1;
// 		data[0].posts.map(post => {
// 			var k=Number(post.likes);
// 			User.update(query,{k:n},function(err){
// 				if(err) throw err;
// 			});
// 		});
// 	res.redirect('/user');
// 	});
// });

// app.post('/cmt/:uid',function(req,res){
 
// 	var query={_id:req.params.uid};
// 	User.find(query,function(err,data){
// 		if(err) throw err;
// 		var n=Number(data[0].posts[0].comment.length)+1;
// 		data[0].posts.map(post => {
// 			var k=Number(post.comment.length);
// 			User.update(query,{k:n},function(err){
// 				if(err) throw err;
// 			});
// 		});
// 	res.redirect('/user');
// 	});
// });

app.get('/newuser/:email/:pwd/:fname/:lname',function(req,res){

    //have a image upload option??
 	var a1=req.params.fname.substr(0,1);
 	var a2=req.params.lname.substr(0,1); 
    var user3=User({email:req.params.email,img:'',followers:[],following:[],password:req.params.pwd,initials:a1+a2,
    				name:req.params.fname + ' ' + req.params.lname,joindate:new Date()})
    				.save(function(err){
    						if(err) throw err;
    			  });
    var query={password:req.params.pwd};
    User.find(query,function(err,data){
    	if(err) throw err;
    	res.json(data[0]);
    });
});

const publicKey='BKgPEG-yxGjEwubcob9tfvgfOkqjJW9EPe60SDiaJNo_EudTYOMZGkjdVP9wzVUJOCcmecelw4OKbHu-tcw2p4Y';
const privateKey='TwccAFnxAS8ftEkyEqpfpuTtthaxwBOOvI4q9yxpHQo';

webpush.setVapidDetails('mailto:test@test.com',publicKey,privateKey);

app.post('/subscribe',function(req,res){
   
    console.log('came here');
    console.log(req.body)
	const subscription=req.body;
	res.status(201).json({});
	const payload=JSON.stringify({title:'Push Test'});
	webpush.sendNotification(subscription,payload).catch(function(err){
        console.log('yh h kya error');
	});

});

//app.post('/share/:id/:myid/:usersArray' , urlencodedParser , function(req , res){
app.get('/share/:id/:myid', function(req , res){
	console.log('hey man');
	 // const subscription = req.body;
	 // var j=0;
 	//  var array = req.params.usersArray;
 	//  var query = {_id : req.params.myid};
 	//  Post.find({_id:req.params.id})
 	//  	.then(data => {
 	//  		 var caption = data[0].caption;
 	//  		 User.find(query)
		//  	 	.then(data => {
		//  	 		var whoshared = data[0].name;
		//  	 		var msg1 = "You shared a post with caption " + caption + " .";
		//  	 		var payload1 = Json.stringify({title:msg1});
		// 			webpush.sendNotification(subscription,payload1).catch(function(err){
		// 				       console.log(err);
		// 					});
		// 			return User.updateOne(query,{$push:{msgs:msg1}});
		//  	 	})
		//  	 	.then(res => {
		//  	 		var msg = whoshared + " shared a post to you with caption " + caption + " .";
		//  	 		repeat2(array , j , msg , req.params.id);
		//  	 	});
 	//  	});

});

app.post('/tag/:id/:myid/:usersArray' , function(req , res){
			
	 const subscription = req.body;
	 var j=0;
 	 var array = req.params.usersArray;
 	 var query = {_id : req.params.myid};

 	 Post.find({_id:req.params.id})
 	 	.then(data => {
 	 		 var caption = data[0].caption;
 	 		 User.find(query)
		 	 	.then(data => {
		 	 		var whotaged = data[0].name;
		 	 		var msg1 = "You taged your friends in a post with caption " + caption + " .";
		 	 		var payload1 = Json.stringify({title:msg1});
					webpush.sendNotification(subscription,payload1).catch(function(err){
						       console.log(err);
							});
					return User.updateOne(query,{$push:{msgs:msg1}});
		 	 	})
		 	 	.then(res => {
		 	 		var msg = whotaged + " taged you in a post with caption " + caption + " .";
		 	 		repeat2(array , j , msg , req.params.id);
		 	 	});
 	 	});
});


app.get('/followed/:id/:wid' , function(req,res){

   app.use(express.static(path.join(__dirname,'node-push-notifications-client')));
   app.get('/');
   console.log('step number 1');
 //   const subscription = req.body;
 //    var query = {_id : req.params.id};
 //    var query1 = {_id : req.params.wid};
 //    var i = 0;
	// User.find(query)
	// 	.then(data => {

	// 		//passing 2 variables from one then to another ??
	// 		console.log(data);
	// 		var name1 = data[0].name;
	// 		var msg1 = 'You followed ' + name1 + '.';
	// 		var payload1 = Json.stringify({title:msg1});
	// 		webpush.sendNotification(subscription,payload1).catch(function(err){
	// 			       console.log(err);
	// 				});
	// 		var ans1 = {name:data[0].name,email:data[0].email};
	// 	 	return User.updateOne(query1 , {$push : {following : ans1 , msgs : msg1}});
 //    	}).then(res => {
	// 		return User.find(query1);
	// 		}).then(data => {
	// 			var name2 = data[0].name;
	// 			var msg2 = name2 + ' - followed you .';
	// 			var payload2 = Json.stringify({title:msg2});
	// 			webpush.sendNotification(subscription,payload2).catch(function(err){
	// 			       console.log(err);
	// 				});
	// 			var ans2 = {name:data[0].name,email:data[0].email};
	// 			return User.updateOne(query , {$push : {followers  : ans2 , msgs : msg2}});
	// 			}).then(res => {
	// 				var finalMsg = name2 + 'followed' + name1;
	// 				return User.find({ _id : {$nin : [ req.params.id , req.params.wid ] }})
	// 			}).then(data => {
	// 				repeat(data , i , finalMsg);
	// 			});
});

function notifyAll(ary,amount,msg){
	var query = {_id:ary[amount]._id};
	User.find(query)
	.then(data => {
		var payload =  JSON.stringify({title:msg});
		webpush.sendNotification(subscription,payload).catch(function(err){
				       console.log(err);
					});
		return User.updateOne(query , {$push : {msgs:msg}});
	})
	.then(res => {
		repeat(ary,amount+1,msg);
	});
}

var amount = 0;var ary=[];var msg=" ";
function repeat(ary,amount,msg){
	if(amount>=ary.length){
		console.log('DONE!!');
		return;
	}
	return notifyAll(ary,amount,msg);

}

function notifyAll2(ary,amount,msg,postid){
	var query = {_id:Number(ary[amount])};
	User.find(query)
	.then(data => {
		var payload =  JSON.stringify({title:msg});
		webpush.sendNotification(subscription,payload).catch(function(err){
				       console.log(err);
					});

		return User.updateOne(query , {$push : {msgs:msg,taged:postid}});
	})
	.then(res => {
		repeat2(ary,amount+1,msg);
	});
}

var postid=0;
function repeat2(ary,amount,msg,postid){
	if(amount>=ary.length){
		console.log('DONE!!');
		return;
	}
	return notifyAll2(ary,amount,msg,postid);

}

function notifyAll2s(ary,amount,msg,postid){
	var query = {_id:Number(ary[amount])};
	User.find(query)
	.then(data => {
		var payload =  JSON.stringify({title:msg});
		webpush.sendNotification(subscription,payload).catch(function(err){
				       console.log(err);
					});

		return User.updateOne(query , {$push : {msgs:msg,shared:postid}});
	})
	.then(res => {
		repeat2s(ary,amount+1,msg);
	});
}

var postid=0;
function repeat2s(ary,amount,msg,postid){
	if(amount>=ary.length){
		console.log('DONE!!');
		return;
	}
	return notifyAll2s(ary,amount,msg,postid);

}

var amount = 0;var ary=[];var msg=" ";var finalary=[];var m=0;var res=0;

app.get('/followedpost/:id' , function(req,res){

	var query = {_id : req.params.id};
	var afr=[];
	var i=0;
	User.find(query)
		.then(data => {
			afr=data[0].following;
			repeat3(afr,i,finalary,m,res);
		});
});

function notifyAll3(ary,amount,finalary,m,res){


	var query = {email:ary[amount].email};
	var ans = [];
	Post.find(query)
	.then(data => {
		//console.log(data);
		for(var d=0;d<data.length;d++){
			finalary[m]=data[d];
			m++;
		}
		amount++;
		ans = repeat3(ary,amount,finalary,m,res);
		//console.log(ans);
		res.send(ans);
	});
}

function repeat3(ary,amount,finalary,m,res){
	if(amount>=ary.length){
		//console.log('came');
		return finalary;
	} else if(ary.length>0){
	return notifyAll3(ary,amount,finalary,m,res);}
	if(ary.length==0)
		return [];
}

app.get('/myfollowing/:id' , function(req,res){

    console.log('came here');
	var query={_id:req.params.id};
	var i=0;
	User.find(query)
	.then(data => {
		var array=data[0].following;
		console.log("this")
		console.log(array);
		repeat4(array,i,finalary,m,res);
	})
});

app.get('/myfollowers/:id' , function(req,res){

	//console.log('came here')
	var query={_id:req.params.id};
	var i=0;
	User.find(query)
	.then(data => {
		var array=data[0].followers;
		repeat4(array,i,finalary,m,res);
	})
});

function notifyAll4(ary,amount,finalary,m,res){


	var query = {email:ary[amount].email};
	var ans = [];
	console.log(query);
	User.find(query)
	.then(data => {
		finalary[m]={_id:data[0]._id,name:data[0].name,pic:data[0].img};
		m++;amount++;
		ans = repeat4(ary,amount+1,finalary,m);
		console.log(ans);
		res.send(ans);
	});
}

function repeat4(ary,amount,finalary,m,res){
	if(amount>=ary.length){
		console.log('came');
		return finalary;
	} else if(ary.length>0){
	return notifyAll4(ary,amount,finalary,m,res);}
	if(ary.length==0)
		return [];

}





// app.get('/showpost/:name' , function(req,res){
// 	var query = {name : req.params.name};
// 	User.find(query , function(err,data){
// 		if(err) throw err;
// 		if(data.length>0){
// 			res.send(data[0]);
// 		}
// 	});
// });

app.get('/myposts/:id' , function(req,res){

	var query = {_id:req.params.id};
	User.find(query)
	.then(data => {
		var email=data[0].email;
		return Post.find({email:email});
	})
	.then(data => {
		    console.log('my posts found');
			res.send(data);
	})

});

var finaltaged=[];var m1=0;

app.get('/mytag/:id' , function(req,res){

	var query = {_id:req.params.id};
	var i=0;
	User.find(query)
	.then(data => {
		var taged=data[0].taged;
		r1(taged,i,finaltaged,m1);
	});

});

function n1(taged,ammt,finaltaged,m1){

		var query={_id:Number(taged[ammt])};
		Post.find(query)
		.then(data => {
			finaltaged[m1]=data[0];
			m1++;ammt++;
			r1(taged,ammt,finaltaged,m1);
		})
}

var taged=[];var ammt=0;
function r1(taged,ammt,finaltaged,m1){
		if(ammt>=taged.length)
				res.send(finaltaged);
		n1(taged,ammt,finaltaged,m1);
}


app.get('/myshare/:id' , function(req,res){

	var query = {_id:req.params.id};
	var i=0;
	User.find(query)
	.then(data => {
		var shared=data[0].shared;
		r1(shared,i,finaltaged,m1);
	});

});

app.get('/mymessages/:id' , function(req,res){

	var query = {_id:req.params.id};
	User.find(query,function(err,data){
		if(err) throw err;
		res.send(data[0].msgs);
	});
});

app.get('/addpost/:id/:caption', function(req,res){

	var query = {_id : req.params.id};
	//console.log(req.body.title);
	console.log('came to addpost');
    User.find(query)
    .then(data => {
    	var email = data[0].email;
    	console.log(email);
    	return Post({email:email,date:new Date(),likes:0,comment:[],pic:'',caption:req.params.caption}).save();
    })
    .then(res => {
    	console.log('post added');
    });
});

app.get('/post/:id', function(req,res){

	var query = {_id : req.params.id} ; 

	Post.find(query)
		.then(data => {
			var likes = Number(data[0].likes) + 1;
			return Post.updateOne(query , {$set : {likes : likes}})
		})
		.then(res => {
			return Post.find(query)
		})
		.then(data => {
			res.send(data[0]);
		});
});

app.get('/addcomment/:cmt/:id' , function(req,res){
		console.log('came to cmt');
	var query = {_id : req.params.id};
	var comment = req.params.cmt;

	Post.find(query)
		.then(data => {
			return Post.updateOne(query , {$push : {comment : comment}})
		})
		.then(res => {
			console.log('updated post comment');
		});

});

app.get('/creategrp/:id/:name/:about' , function(req,res){

	var query={_id : req.params.id};

	User.find(query)
	.then(data => {
		var email = data[0].email;
		var data = {name : req.params.name,about : req.params.about,pic:'', 
					members : [{_id:data[0]._id,name:data[0].name,email:email}] , gallery : [],admin:data[0].name};
		return Group(data).save();
	})
	.then(res => {
		console.log('group created');
	});
});

var ary1=[];var finalarray=[];var i=0;var m2=0;

app.get('/grppost/:id',function(req,res){
	var query={_id : req.params.id};
	console.log('on to get grp posts');
	Group.find(query , function(err,data){
		if(err) throw err;
		ary1=data[0].members;
		console.log(ary1);
		r2(ary1,i,finalarray,m2,res);
	});
});

var amtt=0;var fary=[];

function n2(ary1,amtt,fary,m2,res){

	var query={email:ary1[amtt].email};
	var ans=[];
	Post.find(query)
	.then(data => {
		for(var i=0;i<data.length;i++){
			fary[m2]=data[i];
			m2++;
		}
		amtt++;
		ans = r2(ary1,amtt,fary,m2,res);
		console.log(ans);
		res.send(ans);
	});
}


function r2(ary1,amtt,fary,m2,res){
	if(amtt>=ary1.length)
		return fary;
    else if(ary1.length>0)
		return n2(ary1,amtt,fary,m2,res);
	if(ary1.length==0)
		return [];
}

app.get('/getallgrp/:id',function(req,res){
	var query = {_id:req.params.id};
	console.log(query);
	var k=0;
	var GrpIdArray=[];
	User.find(query)
		.then(data => {
			var email = data[0].email;
			console.log(email);
			Group.find({},function(err,data){
				if(err) throw err;
				for(var j=0;j<data.length;j++){
					console.log('inside grps');
					for(var i=0;i<data[j].members.length;i++){
						var e=data[j].members[i].email;
						if(e==email){
							console.log('email matched');
							GrpIdArray[k]=data[j]._id;
							k++;
							break;
						}
					}
				}
				if(GrpIdArray.length>0){
					console.log(GrpIdArray);
					res.send(GrpIdArray);
				} else
					res.send([]);
			});
		});	
});

app.get('/getalljoingrp/:id',function(req,res){
	console.log('came to get all invites')
	var query = {_id:req.params.id};
	User.find(query)
		.then(data => {
			var joingrp = data[0].joingrp;
			console.log('array of joingrp ids');
			console.log(joingrp);
			res.send(joingrp);
		});
});


app.get('/getgrp/:grpid' , function(req,res){
	console.log('on get grp');
	Group.find({_id : req.params.grpid},function(err,data){
		if(err) throw err;
		console.log(data);
		res.send(data);
	});
});

app.get('/changegrpprofile/:id/:name/:about',function(req,res){
	var query = {_id : req.params.id};
	Group.updateOne(query , {name:req.params.name , about : req.params.about},function(err){
		if(err) throw err;
		console.log('edited group profile');
	});
});

app.get('/grpabout/:id',function(req,res){
	console.log('for members');
	var query = {_id : req.params.id};
	Group.find(query , function(err,data){
		if(err) throw err;
		console.log('grpmembers' + data);
		res.send(data);
	});
});

app.get('/removeGrpMember/:memid/:grpid' , function(req,res){
	var query1 = {_id : req.params.grpid};
	console.log('remove member');
	console.log(req.params.grpid);

	console.log("_id: " + mongoose.Types.ObjectId(req.params.memid));

	console.log(typeof mongoose.Types.ObjectId(req.params.memid));

	/**/
	Group.updateOne(query1, { $pull : { members : {_id:mongoose.Types.ObjectId(req.params.memid)}}} , function(err){
		if(err) throw err;
		console.log('Group member removed');
	});
});


app.get('/memberprofile/:id/:grpid' , function(req,res){
	var query = {_id:req.params.grpid};
	Group.find(query)
	.then(data => {
		var array = data[0].members;
		for(var i=0;i<array.length;i++){
			if(array[i]._id == req.params.id){
				var email = array[i].email;
				break;
			}
		}
		return email;
	})
	.then(email => {
		var query = {email:email};
		return User.find(query);
	})
	.then(data => {
		console.log('came to stage2');
		console.log(data);
		res.send(data[0]._id);
	});
});

app.get('/changeprofile/:id/:email/:name',function(req,res){

	const query = {_id:req.params.id};
	const newName = req.params.name;
	const newEmail = req.params.email;
	User.find(query,function(err,data){
		if(err) throw err;
		if(data.length > 0){
			console.log(data);
			const email = data[0].email;
			const name = data[0].name;
			User.updateOne(query,{email:newEmail,name:newName},function(err){
				if(err) throw err;
				console.log('up');
			});
		}
	});
});

app.get('/grpinvite/:id/:grpid' , function(req,res){

	var query = {_id : req.params.id};
	User.find(query)
	.then(data => {
		var input = {id:req.params.grpid};
		return User.updateOne(query,{$push : {joingrp : input}});
	})
	.then(res => {
		console.log('grp invite send');
		User.find(query,function(err,data){
			if(err) throw err;
			console.log(data[0].joingrp);
		});
	});
});

app.get('/checkgrp/:id/:grpid' , function(req,res){
	var query = {_id : req.params.grpid};
	var flag=0;
	Group.find(query)
	.then(data => {
		var array=data[0].members;
		console.log('grp members check');
		User.find({_id:req.params.id},function(err,data){
			if(err) throw err;
			var email = data[0].email;
			console.log('user email check');
			for(var i=0;i<array.length;i++){
				if(array[i].email==email){
					console.log('email matched already a member');
					flag=1;
					res.send({exist:'yes',id:req.params.grpid});
					break;
				}
			}
			if(flag==0){
				console.log('email not matched');
				res.send({exist:'no',id:req.params.grpid});
			}
		});
	});
});

app.get('/removejoingrp/:id/:usrid',function(req,res){
		var query = {_id:req.params.usrid};
		console.log('came to remove group');
		User.find(query)
		.then(data => {
			return User.updateOne(query , {$pull : {joingrp:{id:mongoose.Types.ObjectId(req.params.id)}}} );
		})
		.then(res => {
			console.log('removed from invites');
		});
});

app.get('/addmember_joingrp/:grpid/:usrid',function(req,res){
	var query = {_id:req.params.usrid};

	User.find(query)
	.then(data => {
		var email = data[0].email;
		var _id = data[0]._id;
		var name = data[0].name;
		var input = {email,_id,name};
		console.log('add member');
		console.log(input);
		return Group.updateOne({_id:req.params.grpid},{$push : {members : input}});
	})
	.then(res => {
		console.log('new member added to group via invite link');
	});
});


app.listen('8082');

//service worker - follow
//followed post me share,tage,like,comment
//grps
// follow button on every page .. see related to notification and pic upload option by user on profile



// change profile me password ke liye forgot password and all bnana h
