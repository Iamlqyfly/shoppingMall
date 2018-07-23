<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>/Address</span>
    </nav-bread>

    <div class="checkout-page">
      <div class="container">
        <div class="checkout-addr">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
          </div>

          <!-- process step 步骤 -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>Confirm</span>address</li>
              <li><span>View your</span>order</li>
              <li><span>Make</span>order</li>
              <li><span>Make</span>payment</li>
              <li><span>Order</span>confirmation</li>
            </ul>
          </div>

          <div class="page-title-normal checkout-title">
            <h2><span>Shipping address</span></h2>
          </div>
          <div class="addr-list-wrap">
            <div class="addr-list">
              <ul>
                <li v-for="(item,index) in addressListFilter" :key="item.id"
                  :class="{'check':checkIndex == index}"
                  @click="checkIndex = index;selectedAddrId=item.addressId" >
                  <dl>
                    <dt>{{item.userName}}</dt>
                    <dd class="address">{{item.streetName}}</dd>
                    <dd class="tel">{{item.tel}}</dd>
                  </dl>
                  <div class="addr-opration addr-del">
                    <a href="javascript:void(0)" class="addr-del-btn"
                      @click="delAddressConfirm(item.addressId)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="addr-opration addr-set-default">
                    <a href="javascript:;" class="addr-set-default-btn" v-if="!item.isDefault" @click="setDefault(item.addressId)"><i>Set default</i></a>
                  </div>
                  <div class="addr-opration addr-default" v-if="item.isDefault">Default address</div>
                </li>
                <li class="addr-new">
                  <div class="add-new-inner">
                    <i class="icon-add">
                      <svg class="icon icon-add">
                        <use xlink:href="#icon-add"></use>
                      </svg>
                    </i>
                    <p>Add new address</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="shipping-addr-more">
              <a class="addr-more-btn up-down-btn" href="javascript:;"  
                @click="expand" v-bind:class="{'open':limit>3}">
                  more
                  <i class="i-up-down">
                    <i class="i-up-down-l"></i>
                    <i class="i-up-down-r"></i>
                  </i>
              </a>
            </div>      
          </div>
          <div class="page-title-normal checkout-title">
            <h2><span>Shipping method</span></h2>
          </div>
          <div class="lemall-msg-info hidden">
            <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
          </div>

          <div class="shipping-method-wrap">
            <div class="shipping-method">
              <ul>
                <li class="check">
                  <div class="name">Standard shipping</div>
                  <div class="price">Free</div>
                  <div class="shipping-tips">
                    <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                  </div>
                </li>
              </ul>
            </div>
          </div> 
          <div class="next-btn-wrap">
            <!-- a标签跳转 -->
            <router-link class="btn btn--m btn--red" v-bind:to="{path:'/orderConfirm',query:{'addressId':selectedAddrId}}">Next</router-link>
          </div> 
        </div>
      </div>    
    </div>
    <!-- 模态框 -->
      <modal :mdShow="isMdShow" @close="closeModal">
        <p slot="message">
          您是否确认要删除此地址?
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="delAddress">确认</a>
          <a class="btn btn--m btn--red" href="javascript:;" @click="isMdShow=false">取消</a>
        </div>
      </modal>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'  // 头部
import NavFooter from '@/components/NavFooter.vue'  // 底部
import NavBread from '@/components/NavBread.vue'  // 面包屑
import Modal from '@/components/Modal.vue'  // 模态框
import axios from 'axios'
export default {
    data() {
      return {
        addressList: [],  // 地址列表
        limit: 3, // 默认显示3个地址
        checkIndex: 0, // 选中的地址索引
        isMdShow: false,
        addressId: '', // 地址id的存储，用于请求传参
        selectedAddrId:''  // 选中的地址id存储,用于点击Next跳转到订单确认页面传参
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted(){
      this.init()
    },
    computed:{
      addressListFilter() {
        return this.addressList.slice(0,this.limit)
      }
    },
    methods: {
      init() { //渲染地址列表
        axios.get('/users/addressList').then( response => {
          let res = response.data
          this.addressList = res.result
        })
      },
      expand() { //点击more加载更多
        if(this.limit == 3) {
          this.limit = this.addressList.length
        }else {
          this.limit = 3
        }
      },
      setDefault(addressId) { //设置默认地址
        axios.post('/users/setDefault',{addressId: addressId}).then( response => {
          let res = response.data
          if(res.status == '0'){
            this.init() //重新渲染地址列表
          }
        })
      },
      closeModal() { //关闭模态窗
        this.isMdShow = false
      },
      delAddressConfirm(addressId) {
        this.isMdShow = true  // 点击删除图标，模态框出现
        this.addressId = addressId //地址赋值全局
      },
      delAddress() {
        axios.post('/users/delAddress',{
          addressId: addressId
        }).then( response => {
          let res = response.data
          if(res.status == '0'){
            this.isMdShow = false // 告诉模态框组件，设置模态框消失
            this.init() //重新渲染地址
          }
        })
      },


    },
}
</script>

<style>

</style>
