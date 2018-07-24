var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
var productSchema = new mongoose.Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    
    // 在列表页点击“加入购物车时”，会获取对应goods商品数据，然后给该商品添加checked和
    // productNum属性，再将该商品添加到购物车列表中，Schema中不定义属性的话是添加不了的。
    "checked":String,
    "productNum":Number
});
//model是由schema生成的模型，可以对数据库的操作
module.exports = mongoose.model('good', productSchema);
// 定义一个good商品模型，可以根据这个商品模型调用其API方法。
// 这个模型定义的是数据库dumall的goods集合数据，所以这个model取名good是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式"goods"来查找数据集合。
// module.exports = mongoose.model('good',produtSchema,'goods'); 也可以后面注明链接的是数据库的goods集合



