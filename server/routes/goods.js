var express = require('express');
var router = express.Router(); //express框架的路由
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接数据库 数据库的名称叫dumall
mongoose.connect('mongodb://127.0.0.1:27017/dumall');  
// 若是带账号密码的：'mongodb://root:123456@127.0.0.1:27017/dumall'

mongoose.connection.on("connected", function() {
    console.log("MongoDB connected success.");
});
mongoose.connection.on("error", function() {
    console.log("MongoDB connected fail.");
});
mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connected disconnected.");
});

//二级路由 查询商品列表数据
router.get('/list',function(req, res, next) {
    // res.send(" hello connected") 可以用来测试是否成功连接
    let page = parseInt(req.param("page"))
    let pageSize = parseInt(req.param("pageSize"))
    let priceLevel = req.param("priceLevel")
    let sort = req.param("sort")
    let skip = (page - 1) * pageSize //分页公式 跳过的数据条数
    var priceGt = '', priceLte = ''
    let params = {}
    if(priceLevel != 'all') { //价格区间过滤功能
       switch(priceLevel) {
           case '0':priceGt = 0; priceLte = 100; break;
           case '1':priceGt = 100; priceLte = 500; break;
           case '2':priceGt = 500; priceLte = 1000; break;
           case '3':priceGt = 1000; priceLte = 5000; break;

       }
       params = {
            salePrice: {
                $gt:priceGt,
                $lte:priceLte
            }
       }
    }
    // 先查询所有，skip(skip)跳过skip条数据，limit(pageSize)一页多少条数据.即分页功能实现
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({'salePrice':sort}); //对价格进行排序
    goodsModel.exec(function(err, doc){
        if(err) {
            res.json({
                status: '1',
                msg: err.mesage
            })
        }else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
    
})
// 启动express
// node server/bin/www 或 pm2方式 或 webstorm 等
// localhost:3000/goods/ '/goods'是app.js中的一级路由，'/'是本页的二级路由

router.post("/addCart",function(req, res, next){
    var userId = '100000077',
    productId = req.body.productId
    var User = require('../models/users.js') //拿到user模型
    
    //查询第一条，拿到用户信息
    User.findOne({
        userId: userId 
    },function(err, userDoc){
       if(err) {
           res.json({
               status: '1',
               msg: err.message
           })
       }else {
        console.log("userDoc"+userDoc);  // 用户数据
           if(userDoc){
               let goodsItem = ''
               userDoc.cartList.forEach(function(item){
                   //遍历用户购物车，判断加入购物车的商品是否已经存在
                   if(item.productId == productId) {
                       goodsItem = item
                       item.productNum++ //购物车商品数量+1
                   }
               })
               if(goodsItem) { //若购物车商品已经存在
                   userDoc.save(function(err2,doc2){
                       if(err2) {
                           res.json({
                               status: "1",
                               msg: err2.message
                           })
                       }else {
                           res.json({
                               status: '0',
                               msg: '',
                               result: 'suc'
                           })
                       }
                   })
               }else { //若是不存在，就添加进去
                   Goods.findOne({productId:productId},function(err1,doc){
                    // 从商品列表页Goods查询点击加入购物车的那件商品信息
                      if(err1) {
                          res.json({
                              status: '1',
                              msg: err1.message
                          })
                      }else {
                        if(doc){
                            doc.productNum = 1;   // 在Goods模型中添加属性，要去models/goods.js的Schema添加这两个属性。
                            doc.checked = 1;
                            userDoc.cartList.push(doc);  // 添加信息到用户购物车列表中
                            userDoc.save(function(err2,doc2){  // 保存数据库
                                if(err2){
                                    res.json({
                                        status:"1",
                                        msg:err2.message
                                    })
                                }else{
                                    res.json({
                                        status:"0",
                                        msg:'',
                                        result:'suc'
                                    })
                                }
                            })
                        }
                      }
                   })
               }
           }
       }
    })
})




module.exports = router