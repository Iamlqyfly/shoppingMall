<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>My Cart</span>
        </nav-bread>
        <div class="container">
            <div class="cart">
                <div class="page-title">
                    <h2 class="page-title-h2">My Cart</h2>
                </div>
                <div class="cart-list-wrap">
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
                                        <a href="javascript:void(0)" class="checkbox-btn item-check-btn"
                                          :class="{'check' :item.checked == '1'}" @click="editCart('checked',item)">
                                          <svg class="icon icon-ok">
                                            <use xlink:href="#icon-ok"></use>
                                          </svg>
                                        </a>
                                    </div>
                                    <div class="cart-item-pic">
                                        <img v-lazy="'/static/'+item.productImage" :alt="item.productName">
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
                                        <div class="select-self">
                                            <div class="select-self-area">
                                                <a class="input-sub" @click="editCart('minus',item)">-</a>
                                                <span class="select-num">{{item.productNum}}</span>
                                                <a class="input-add" @click="editCart('add',item)"+></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-tab-4">
                                    <div class="item-price-total">{{(item.productNum*item.salePrice) | currency('$')}}</div>
                                </div>
                                <div class="cart-tab-5">
                                    <div class="cart-item-operation">
                                        <a href="javascript:void(0)" class="item-edit-btn" @click="delCartComfirm(item)">
                                            <svg class="icon icon-del">
                                                <use xlink:href="#icon-del"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                 <div class="cart-foot-wrap">
                     <div class="cart-food-inner">
                        <div class="cart-foot-left">
                             <div class="item-all-check">
                                 <a href="javascript:void(0)" @click="toggleCheckAll">
                                    <span class="checkbox-btn item-check-btn" :class="{'check':checkAll}">
                                       <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                                    </span>
                                    <span>Select All</span>
                                 </a>
                             </div>
                        </div>
                        <div class="cart-foot-right">
                            <div class="item-total">
                                Item total: <span class="total-price">{{totalPrice|currency('$')}}</span>
                            </div>
                            <div class="btn-wrap">
                                <a class="btn" :class="{'btn-dis':checkedCount == 0}" @click="checkOut">checkout</a>
                            </div>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
        <Modal :mdShow="modalConfirm" @close="closeModal">
            <p slot="message">你确定要删除此条数据吗?</p>
            <div class="btnGroup">
                <a href="javascript:void(0)" class="btn" @click="delCart">确认</a>
                <a href="javascript:void(0)" class="btn" @click="modalConfirm = false">关闭</a>
            </div>
        </Modal>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import Modal from "./../components/Modal";
import axios from "axios";
export default {
  data() {
    return {};
  },
  components: {
      NavHeader,
      NavBread,
      NavFooter,
      Modal,
  }
};
</script>

<style>
</style>
