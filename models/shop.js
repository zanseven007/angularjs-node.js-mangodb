var mongoose = require('mongoose')
var ShopSchema = require('../schemas/shop')
var Shop = mongoose.model('Shop',ShopSchema)

module.exports = Shop