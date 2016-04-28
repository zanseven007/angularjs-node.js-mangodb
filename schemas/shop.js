var mongoose = require('mongoose')

var ShopSchema = new mongoose.Schema({
	sender:String,
	title:String,
	date:String,
	classify:String,
	phone:Number,
	img:String,
	summary:String,
	meta:{
		createAt:{
			type:Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default: Date.now()
		}
	}
})

ShopSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

ShopSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findByClassify:function(classify,cb){
		return this.find({classify:classify}).exec(cb)
	},
	findByName:function(name,cb){
		return this.find({name:{$regex:/name.*/i}}).exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id}).exec(cb)
	},
}

module.exports = ShopSchema

