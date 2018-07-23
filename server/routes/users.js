var express = require('express');
var router = express.Router();
require('./../util/util') // 引入时间格式化函数工具
var User = require('./../models/user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 二级路由 登录接口
router.post('/login', function(req, res, next) {
  //获取参数
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
User.findeOne(param, function (err, doc){
  if(err) {
    res.json({
      status: "1",
      msg: err.message
    });
  }else {
    if(doc) {
      res.cookie("userId", doc.userId,{
        path: '/',
        maxAge: 1000*60*60 // 生命周期
      });
      res.cookie("userName",doc.userName,{
        path: '/',
        maxAge: 1000*60*60
      });
      // req.session.user = doc;   要安装express session插件的
      res,json({
        status: '0',
        msg: '',
        result: {
          userName:doc.userName
        }
      });
    }
  }
})  
  
});


//登出接口
router.post("/logout",function(req,res,next){
  res.cookie("userId","",{
    path:'/',
    maxAge: -1
  })
  res.json({
    status: "0",
    msg: '',
    result: ''
  })
});

//登录校验
router.get("/checkLogin", function(req, res,next){
  if(req.cookies.userId){
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
       //如果没有登录 req.cookies.userName会报undefined 所以要给一个空值
    })
  }else {
    res.json({
      status: '1',
      msg: '未登录',
      result:''
    })
  }
});

// 查询购物车商品数量
router.get("/getCartCount",function(req, res, next){
  if(req.cookies && req.cookies.userId) {
    var userId = req.cookies.userId
    User.findOne({"userId":userId},function(err,doc) {
      if(err){
        res.json({
          status: '0',
          msg:err.message
        })
      }else {
        let cartList = doc.cartList
        let cartCount = 0
        cartList.map(function(item){
          cartCount += parseInt(item.productNum)
        })
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  }else {
    res.json({
      status: '0',
      msg: '当前用户不存在'
    })
  }
});

// 查询当前用户的购物车数据
router.get('/cartList',function(req,res,next){
  var userId = req.cookies.userId;   // 获取用户Id
  User.findOne({userId:userId},function(err,doc){
      if(err){
          res.json({
              status:'1',
              msg:err.message,
              result:''
          });
      }else{
          if(doc){
              res.json({
                  status:'0',
                  msg:'',
                  result:doc.cartList
              })
          }
      }
  })
});

//购物车删除功能
router.post('/cartDel',function(req, res, next){
  var userId = req.cookies.userId,productId = req.body.productId
  User.update({
    userId: userId
  },{
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  },function(err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
});

// 商品修改，修改商品数量和勾选接口

router.post("/cartEdit",function(req,res,next){
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked 
    User.update({ //修改的数据
      "userId": userId,
      "cartList.productId":productId
    },{
      "cartList.$.productNum":productNum,
      "cartList.$.checked":checked,
    },function(err,doc) {
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else {
        res.json({
          status: '0',
          msg: '',
          result: 'suc'
        })
      }
    })  
});
//全选和取消全选
router.post('/editCheckAll',function(req,res,next){
  var userId = req.cookies.userId,
      checkAll = req.body.checkAll? '1': '0'
    User.findeOne({
      userId: userId
    },function(err,user){
      if(err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else {
        if(user) {
          user.cartList.forEach( item => {
            ietm.checked = checkAll
          })
          user.save(function(err1,doc){
            if(err1) {
              res.json({
                status: '1',
                msg: err1.message,
                result: ''
              })
            }else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        }
      }
    })  
})

// 地址列表页面 
// 查询用户地址接口
router.get("/addressList",function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
      if(err){
          res.json({
              status:'1',
              msg:err.message,
              result:''
          })
      }else{
          res.json({
              status:'0',
              msg:'',
              result:doc.addressList
          })
      }
  })
});



module.exports = router;
