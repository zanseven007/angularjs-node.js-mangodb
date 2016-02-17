var express = require('express')
var ejs = require('ejs')
var path = require('path')
var bodyParser = require("body-parser");  
var mongoose = require('mongoose')
var Shop = require('./models/shop')
var User = require('./models/user')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/shop')

app.set('views','./views')
app.engine('.html', ejs.__express)
app.set('view engine','html')
app.use(express.static(path.join(__dirname,'bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port)

console.log('designer started on port'+port)
// status说明
// 1成功
// 2失败
// test ajax json
app.get('/myjson',function(req,res){
	Shop.find(function(err, shopx) {
		res.json(shopx)
	})
})
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