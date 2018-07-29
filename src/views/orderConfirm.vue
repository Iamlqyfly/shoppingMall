<!--订单确认组件 -->
<template>
  <div>
    <nav-header></nav-header>
     <!-- 面包屑组件 -->
    <nav-bread>
      <span>Order Confirm</span>
    </nav-bread>

    <div class="container">
      <div class="checkout-order">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span>address</li>
            <li class="cur"><span>View your</span>order</li>
            <li><span>Make</span>payment</li>
            <li><span>Order</span>confirmation</li>
          </ul>
        </div>
        <!-- order list -->

        <div class="page-title-normal checkout-title">
          <h2><span>Order content</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order content</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList" :key="item.id" v-if="item.checked == '1'">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.productImage" :alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>

                <!-- 商品单价 -->
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice | currency('$')}}</div>
                </div>
                
                <!-- 商品数量 -->
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">*{{item.productNum}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">In Stock</div>
                  </div> 
                </div>   

                <!-- 商品总金额 -->
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.salePrice*item.productNum | currency('$')}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- price count -->

        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>Item subtotal:</span>
                <span>{{subTotal | currency('$')}}</span>
              </li>
              <li>
                <span>Shipping:</span>
                <span>{{shipping | currency('$')}}</span>
              </li>
              <li>
                <span>Discount:</span>
                <span>{{ discount | currency('$')}}</span>
              </li>
              <li>
                <span>Tax:</span> <!-- 税费 -->
                <span>{{tax | currency('$')}}</span>
              </li>
              <li class="order-total-price">
                <span>Order total:</span> <!-- 用户支付总金额 -->
                <span>{{orderTotal | currency('$')}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
           <!-- <button class="btn btn--m">Previous</button> -->
            <router-link class="btn btn--m" to="/address">Previous</router-link>
          </div>
          <!-- 支付 -->
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="payMent">Proceed to payment</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部组件 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'  // 头部
import NavFooter from '@/components/NavFooter.vue'  // 底部
import NavBread from '@/components/NavBread.vue'  // 面包屑
import Modal from '@/components/Modal.vue'  // 模态框
import axios from 'axios'
import {currency} from '@/util/currency.js'  // 对价格格式化的通用方法
export default {
  data() {
    return {
      shipping: 100,
      discount: 200,
      tax: 400,
      subTotal: 0, //购物车中选中商品的总金额
      orderTotal: 0, // 总金额+配送费-折扣+税费=orderTotal 用户需要支付的金额,默认为0
      cartList: [] //购物车列表
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  mounted() {
    this.init()
  },
  filters: { //定义局部过滤器
    currency: currency 
  },
  methods: {
    init() { //订单列表的接口直接用的购物车列表的接口，渲染页面时选取选中的商品作为订单确认的商品
      axios.get('/users/cartList').then( response => {
        let res = response.data
        this.cartList = res.result
        console.log(res.result,1)

        this.cartList.forEach(item => { 
          if(item.checked == '1') { // 遍历购物车商品，获取选中商品的总金额
            this.subTotal += item.salePrice*item.productNum
          }
        })
        // 获取用户最终支付的金额，(总金额+配送费-折扣+税费)
        this.orderTotal = this.subTotal+this.shipping-this.discount+this.tax; 
      })
    },
    payMent(){
      // 从路由那里获取到订单地址的id
      // http://localhost:8080/#/orderConfirm?addressId=100001
      var addressId = this.$route.query.addressId;
      axios.post('/users/payMent',{
        addressId:addressId,
        orderTotal:this.orderTotal
      }).then((response)=>{
        let res = response.data;
        if(res.status == '0'){
          console.log('order created success');
          // 路由跳转到订单成功页面
          this.$router.push({
            path:'/orderSuccess?orderId='+res.result.orderId
          })
        }
      }) 
    }
  }
}
</script>

<style scoped>

</style>
