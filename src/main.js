// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'  // 滚动加载
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require("../static/loading-svg/loading-bars.svg")
});

Vue.use(infiniteScroll)

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

// import {currency} from './util/currency'
// Vue.filter("currency",currency);  // 定义全局过滤器

//建立store对象
const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: { //更改状态
    //更新用户信息
    updateUserInfo(state,nickName){
      state.nickName = nickName
    },
    updateCartCount(state,cartCount) {
      state.cartCount += cartCount
    },
    initCartCount(state,cartCount) {
      state.cartCount = cartCount
    }

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
