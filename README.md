# shop-mall

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 技术栈
```
vue2 + vuex + vue-router + webpack4 +  axios + svg + node + mongoDB + mongoose + express
```
### 数据接口

前端页面使用vue构建，不再mock数据，后端服务器由Node.js的Express框架搭建，数据库为MongoDB，网络请求为axios,利用vuex实现登录退出功能，关于商品、购物车、地址的修改都是与后台关联的

### 项目功能
+ 登录退出
+ 商品列表（分页请求，并可以加入购物车）
+ 购物车（商品数量的加减，商品的删除，多选全选反选价格联动）
+ 地址模块（设置默认地址，删除）、订单生成（生成订单号，收货人信息，并插入数据库）

### 项目目录
```
| - build
| - config
| - mock     -- json静态数据
| - resource -- 静态资源文件
| - server   -- express框架后端文件
    | - models  
        | - goods.js  -- 商品数据模型
        | - users.js  -- 用户数据模型
    | - routes
        | - goods.js  -- 商品相关接口
        | - users.js  -- 用户相关接口
| - src
    | - assets      -- 样式文件
    | - components
        | - Modal.vue      -- 模态框组件
        | - NavHeader.vue  -- 头部组件
        | - NavBread.vue   -- 面包屑组件
        | - NavFooter.vue  -- 底部组件
    | - router -- 路由配置文件
    | - util   -- 公用方法文件
    | - views
        | - GoodsList.vue    -- 商品列表页组件
        | - Cart.vue         -- 购物车列表组件
        | - Address.vue      -- 地址列表页组件
        | - OrderConfirm.vue -- 订单确认页面
        | - OrderSuccess.vue -- 订单成功页面
    | - App.vue
    | - main.js
| - static   -- 项目所用图片，图标
```

### 前端
#### svg的使用
[手摸手，带你优雅的使用 icon](https://segmentfault.com/a/1190000012213278)

#### 在vue中图片懒加载详细介绍
+ 说明：当网络加载比较慢的时候，使用vue的vue-lazyload，
+ 安装
```
npm install vue-lazyload
```
在入口文件main.js 中
```
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require("../static/loading-svg/loading-bars.svg")
});
```

在组件中使用，把项目组件中的需要懒加载的 :src换成v-lazy,例如：
```
<div class="pic">
    <a href="#"><img :src="'static/img/'+item.productImage" alt=""></a>
</div>
```
替换后
```
<div class="pic">
    <a href="#"><img v-lazy="'static/img/'+item.productImage" alt=""></a>
</div>
```
#### vue-infinite-scroll 瀑布流加载

+ 安装
```
npm install vue-infinite-scroll --save
```
CommonJS使用方式
```
// register globally
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)
 
// or for a single instance
var infiniteScroll = require('vue-infinite-scroll');
new Vue({
  directives: {infiniteScroll}
})
```
ES2015 使用方式
```
// register globally
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
 
// or for a single instance
import infiniteScroll from 'vue-infinite-scroll'
new Vue({
  directives: {infiniteScroll}
})
```
在组件中使用
在template中需要的位置插入
```
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  ...
</div>
```
### 后端
MongoDB sort() 方法
在 MongoDB 中使用 sort() 方法对数据进行排序，sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列
[](http://www.runoob.com/mongodb/mongodb-sort.html)

#### 数据结构设计
```
//商品数据模型
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

//用户购物车列表和地址列表数据结构模型
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


```
### 跨域
前端vue项目的开发环境dev地址: localhost:8080,
后台node服务器的访问地址是: 127.0.0.1:3000,
(本地开启的mongodb服务的地址是: 127.0.0.1:27017)

当前端与后台进行数据交互时，自然就出现跨域问题。
通过在前端 /config/index.js文件下配置 dev选项的 {proxyTable}:
```
proxyTable: {
  '/api': {
    target: 'http://127.0.0.1:3000/api',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''  // 若target中没有/api、这里又为空，则404；
    }
  }
}
```
[proxy](https://vuejs-templates.github.io/webpack/)
#### 关于部署
待续...
### 总结:
这是在某APP上购买的一个课程，做这个项目的原因很简单，就是想体验下全栈的感觉，想更加深入的了解前后端，这个项目算是一个全栈前后端项目的初体验吧 体会到了前后端分离开发方式的好处


