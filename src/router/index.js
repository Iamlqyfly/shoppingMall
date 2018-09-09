import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Cart = (resolve) => {
  import('../views/Cart').then((module) => {
    resolve(module)
  })
}
const Address = (resolve) => {
  import('../views/Address').then((module) => {
    resolve(module)
  })
}
const GoodsList = (resolve) => {
  import('../views/GoodsList').then((module) => {
    resolve(module)
  })
}
const OrderConfirm = (resolve) => {
  import('../views/OrderConfirm').then((module) => {
    resolve(module)
  })
}
const OrderSuccess = (resolve) => {
  import('../views/OrderSuccess').then((module) => {
    resolve(module)
  })
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
  ]
})
