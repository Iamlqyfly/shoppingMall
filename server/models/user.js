var mongoose = require('mongoose');

var userSchema =new mongoose.Schema({
    "userId":String, // 或者 'userId':{type:String}
    "userName":String,
    "userPwd":String,
    'orderList':Array, 
    'cartList':[           // 购物车列表
        {
            "productId":String,
            "productName":String,
            "salePrice":Number,
            "productImage":String,
            "checked":String,     // 是否选中
            "productNum":String  // 商品数量
        }
    ],
    "addressList":[
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": Number,
            "tel": Number,
            "isDefault": Boolean
        }
    ]
});

module.exports = mongoose.model("User",userSchema)