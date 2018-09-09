<template>
  <div>
    <nav-header></nav-header>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2">><span>check out</span></h2>
      </div>

      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span>address</li>
          <li class="cur"><span>View your</span>order</li>
          <li class="cur"><span>Make</span>payment</li>
          <li class="cur"><span>Order</span>confirmation</li>
        </ul>
      </div>
      
      <div class="order-create">
        <div class="order-create-pic">
          <img src="/static/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <h3>Congratulation!<br>Your order is under processing!</h3>
        </div>
        <p>
          <span>Order ID: {{orderId}}</span>
          <span>Order total: {{orderTotal | currency('$')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link class="btn btn--m" to="/cart">Cart List</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link class="btn btn--m" to="/">Goods List</router-link>
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
      orderId:'',  // 订单id
      orderTotal:0  // 订单总金额
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  filters:{   // 定义局部过滤器
    currency:currency  // currency.js传过来的本就是函数
  },
  mounted() {
    // 从路由那里获取到订单id
    // http://localhost:8080/#/orderSuccess?orderId=6221201801252245492
    var orderId = this.$route.query.orderId
    if(!orderId){
      return
    }
    axios.get("/users/orderDetail",{
      params:{
        orderId:orderId
      }
      }).then(response=>{
        let res = response.data;
        if(res.status == '0'){
          this.orderId = orderId;
          this.orderTotal = res.result.orderTotal;
        }
      })
  }
}
</script>

<style scoped>

</style>
