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
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self select-self-open">
                        <div class="select-self-area">
                          <a class="input-sub"  @click="editCart('minu',item)">-</a>
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
                </div>
              </li>
            </ul>
          </div>
        </div>   
        
      </div>
    </div>
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

}
</script>

<style>

</style>
