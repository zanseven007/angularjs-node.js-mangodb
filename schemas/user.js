var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	name:String,
	psd:String,
	academy:String,
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

UserSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

UserSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id}).exec(cb)
	},
	findByName:function(name,cb){
		return this.findOne({name:name}).exec(cb)
	},
}

module.exports = UserSchema

