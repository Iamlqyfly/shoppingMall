<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>My Cart</span>
    </nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2">
            <span>My Cart</span>
          </h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
               <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>  
            <ul class="cart-item-list">
              <li v-for="item in cartList" :key="item.id">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn"
                      :class="{'check':item.checked=='1'}"
                      @click="editCart('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.productImage" :alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>  
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice | currency('$')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub"  @click="editCart('minus',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="editCart('add',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(item.productNum*item.salePrice) | currency('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="cart-foot-wrap">
            <div class="cart-foot-inner">
              <div class="cart-foot-l">
                <div class="item-all-check">
                  <a href="javascipt:;" @click="toggleCheckAll">
                    <span class="checkbox-btn item-check-btn" 
                    :class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"/>
                      </svg>
                    </span>
                    <span>Select all</span>
                  </a>
                </div>
              </div>
              <div class="cart-foot-r">
                <div class="item-total">
                  Item total: <span class="total-price">{{totalPrice | currency('$')}}</span>
                </div>
                <div class="btn-wrap">
                  <a class="btn btn--red" v-bind:class="{'btn--dis':checkedCount==0}" @click="checkOut">Checkout</a>
                </div>
              </div>
            </div>
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
  data(){
      return {
        cartList:[],  // 购物车商品列表
        delItem:{},  // 要删除的商品
        modalConfirm:false   // 模态框是否显示
        // checkAllFlag:false   // 控制全选
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted:function(){
      this.init();
    },

    filters: {
      currency: currency
    },

    computed: {
      checkAllFlag() {  //商品勾选数量=购物车商品列表种数时，返回true代表全选
        return this.checkedCount == this.cartList.length
      },
      checkedCount(){ //商品勾选数量
        var i = 0
        this.cartList.forEach(item => {
          if(item.checked == '1') i++
        })
        return i 
      },
      totalPrice() {
        var money = 0;
        this.cartList.forEach( item => {
          if(item.checked == '1') {
            money += parseFloat(item.salePrice) * parseInt(item.productNum)
          }
        })
        return money
      },
    },
    methods: {
      init() {
        axios.get('/users/cartList').then( response => {
          let res = response.data
          this.cartList = res.result
        })
      },
      //点击删除图标
      delCartConfirm(item) { 
        this.modalConfirm = true
        this.delItem = item
      },

      closeModal() {
        this.modalConfirm = false
      },
      delCart() {
        axios.post('/users/cartDel',{
          productId: this.delItem.productId
        }).then( response => {
          let res = response.data
          if(res.status = '0') {
            this.modalConfirm = false
            this.init() //重新初始化购物车数据

            var delCount = this.delItem.productNum
            
          }
        })
      },
      editCart(flag,item) {
        if(flag == 'add') {
          item.productNum++
        }else if(flag == 'minus'){
          if(item.productNum <= 1) {
            return
          }
          item.productNum--
        }else { //商品控制选中
          item.checked = (item.checked == '1') ? '0': '1'
        }

        axios.post('/users/cartList',{
          productId:item.productId,
          productNum:item.productNum,
          checked:item.checked
        }).then( response => {
          let res = response.data
          let num = 0 //右上角购物车数量更新
          if(flag == 'add') {
            num = +1
          }else if (flag == 'minus'){
            num = -1
          }
          this.$store.commit("updateCartCount",num);
        })
      },
      toggleCheckAll() {
        //  不能用这种方法，computed是实时计算属性，若true变成false后，还没来得及执行商品取消勾选操作
        //  就实时计算检测到了勾选的商品种数=购物车列表的商品种数，就又变成全选了 
        // this.checkAllFlag = !this.checkAllFlag; 
      
        var flag = !this.checkAllFlag //声明变量取代
        this.cartList.forEach( item => {
          item.checked = flag ? '1': '0'
        })
        axios.post('/users/editCheckAll',{
          checkAll: flag
        }).then( response => {
          let res = response.data
          if(res.status == '0'){
            console.log('update suc')
          }
        })
      },
      checkOut() { // 已勾选的商品种数 >0 时才可以跳转到地址列表页
        if(this.checkedCount > 0) {
          this.$router.push({ path: '/address'})
        }
      }
    }
}
</script>

<style>

</style>
