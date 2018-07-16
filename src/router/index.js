import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const cart = (resolve) => {
  import('../views/cart').then((module) => {
    resolve(module)
  })
}
const address = (resolve) => {
  import('../views/address').then((module) => {
    resolve(module)
  })
}
const goodsList = (resolve) => {
  import('../views/goodsList').then((module) => {
    resolve(module)
  })
}
const orderConfirm = (resolve) => {
  import('../views/orderConfirm').then((module) => {
    resolve(module)
  })
}
const orderSuccess = (resolve) => {
  import('../views/orderSuccess').then((module) => {
    resolve(module)
  })
}


export default new Router({
  routes: [
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
  ]
})
