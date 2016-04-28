var express = require('express')
var ejs = require('ejs')
var path = require('path')
var bodyParser = require("body-parser");  
var mongoose = require('mongoose')
var Shop = require('./models/shop')
var User = require('./models/user')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://assets.dxycdn.com/shop')

app.set('views','./views')
app.engine('.html', ejs.__express)
app.set('view engine','html')
app.use(express.static(path.join(__dirname,'bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port)

console.log('赞鱼鱼的毕业设计已经在端口：'+port+'开启了！');
// status说明
// 1成功
// 2失败
// test ajax json
app.get('/myjson',function(req,res){
	Shop.find(function(err, shopx) {
		res.json(shopx)
	}).sort({'_id':-1});
})
app.post('/classify',function(req,res){
	Shop.find({classify:req.body.classify},function(err, shopx) {
		res.json(shopx)
	})
})
app.post('/getlist',function(req,res){
	Shop.find({sender:req.body.sender},function(err, shopx) {
		res.json(shopx)
	}).sort({'_id':-1});
})
app.post('/deleteshop',function(req,res){
	Shop.remove({_id:req.body.id},function(err, shopx) {
		if(err){
			console.log(err)
		}else{
			res.json({'status':1,'message':'删除成功'})
		}
	})
})
app.post('/title',function(req,res){
	var str = req.body.title;
	Shop.find({ "$or" : [ {title:{$regex: str, $options:'i'}},{sender:{$regex: str, $options:'i'}},{summary:{$regex: str, $options:'i'}}]},function(err, shopx) {
		res.json(shopx)
	})
})
app.post('/myreset',function(req,res){
	User.update({"name":req.body.name},{$set:{"psd":req.body.newPsw}},function(err, shopx) {
		if(err){
			console.log(err);
		}else{
			res.json({'status':1,'message':'修改成功'})
		}
	})
})
app.post('/edit',function(req,res){
	Shop.update({"_id":req.body.id},{$set:{"title":req.body.title,"classify":req.body.classify,"phone":req.body.phone,"summary":req.body.summary,"img":req.body.img,}},function(err, shopx) {
		if(err){
			console.log(err);
		}else{
			res.json({'status':1,'message':'修改成功'})
		}
	})
})
//登录
app.post('/login',function(req,res){
	User.findByName(req.body.name,function(err,users){
		if(err){
			console.log(err);
		}else if(users==null){
			res.json({'status':2,'message':'用户名不存在'})
		}else if(users !=null && users.psd ==req.body.psd){
			res.json({'status':1,'message':'成功','name':users.name});
		}else{
			res.json({'status':3,'message':'密码错误'});
		}
	})

})
//修改密码
app.post('/newPsw',function(req,res){
	User.findByName(req.body.name,function(err,users){
		if(err){
			console.log(err);
		}else if(users==null){
			res.json({'status':2,'message':'用户名不存在'})
		}else if(users !=null && users.psd ==req.body.psd){
			res.json({'status':1,'message':'成功','name':users.name});
		}else{
			res.json({'status':3,'message':'密码错误'});
		}
	})

})

//注册
app.post('/adduser',function(req,res){
	User.findByName(req.body.name,function(err,users){
		if(err){
			console.log(err);
		}else if(users!==null){
			res.json({'status':2,'message':'用户名已存在'})
		}else{
			var user = User(req.body);
			user.save();
			res.json({'status':1,'message':'成功'})
		}
	})

})
//查询用户存在
app.post('/selectuser',function(req,res){
	User.findByName(req.body.name,function(err,users){
		if(err){
			console.log(err);
		}else if(users!==null){
			res.json({'status':2,'message':'用户名已存在'})
		}else{
			res.json({'status':1,'message':'用户名不存在'})
		}
	})

})
app.post('/addshop',function(req,res){
	var info = Shop(req.body);
	info.save();
	res.json({'status':"ok"})
})
app.get('/delmyjson/:id',function(req,res){
	var id = req.params.id;
	console.log(id)
	if(id){
		Shop.remove({_id:id},function(err){
			if(err){
				console.log(err)
				return
			}
			res.json({'data':'chenggong'})
		})
	}
})
// index page
app.get('/',function(req,res){
	res.render('index',{
		title:'designer 首页'
	})
})
// list page
app.get('/list',function(req,res){
	res.render('list',{
		title:'designer 列表页'
	})
})
// detail page
app.get('/detail:id',function(req,res){
	res.render('detail',{
		title:'designer 详情页'
	})
})
// admin page
app.get('/admin',function(req,res){
	res.render('admin',{
		title:'designer 后台页'
	})
})