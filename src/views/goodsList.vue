<template>
  <div>
    <nav-header></nav-header>
      <nav-bread>
        <span>/Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price 
              <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
                <dd v-for="(price,index) in priceFilter" :key="price.id">
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==index}"  @click="setPriceFilter(index)">{{ price.startPrice }} - {{ price.endPrice }}</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList" :key="item.id">
                    <div class="pic">
                      <a href="#"><img v-lazy="'./../../static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="view-more-normal" 
                  v-infinite-scroll="loadMore" 
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="20">
                <img src='../assets/loading-svg/loading-spinning-bubbles.svg' v-show="loading">
              </div>

            </div>
          </div>

        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">
            请先登录，否则无法加入购物车
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
        </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
          <p slot="message">
            <svg class="icon-status-ok">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成功！</span>
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
            <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
          </div>
        </modal>
      </div>
  </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
import NavBread from './../components/NavBread'
import Modal from './../components/Modal'
import axios from 'axios'
export default {
  data () {
      return {
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'100.00'
          },
          {
            startPrice:'100.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'5000.00'
          }
        ],
        goodsList:[],
        sortFlag:true,
        page:1,
        pageSize:8,
        busy:true, // 滚动加载插件默认禁用
        loading:false,
        mdShow:false,
        mdShowCart:false,
        priceChecked:'all', //选中的价格区间
        filterBy:false, //控制价格菜单的显示
        overLayFlag:false //遮罩的显示
      }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  methods: {
    getGoodsList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1, // sortFlag = true 升序
        priceLevel: this.priceChecked //点击的价格区间
      }
      this.loading = true
      axios.get("/goods/list",{
        params: param
        }).then( res => {
          var res = res.data
          this.loading = false
          if(res.status == "0") {
            if(flag) {
              this.goodsList = this.goodsList.concat(res.result.list)
              if(res.result.count == 0) { //0条数据了，就不加载滚动加载方法了
                this.busy = true // 禁用
              }else {
                this.busy = false //启用
              }

            }else {
              this.goodsList = res.result.list //只加载一页
              this.busy = false
            }
          }else {
            this.goodsList = []
          }
      })
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag //取反 
      this.page = 1 //点击价格排序从第一页开始
      this.getGoodsList()
    },
    setPriceFilter(index) { //点击价格
      this.priceChecked = index
      this.closePop()
      this.getGoodsList()
    },
    showFilterPop(){ 
      //移动端会出现FilterBy选项 
      // 点击filterBy出现价格菜单和遮罩
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop() { //关闭价格菜单和遮罩
      this.filterBy = false
      this.overLayFlag = false
    },
    loadMore() {
      // this.busy = true
      setTimeout( () => {  // 一个滚动完成之后再滚动加载下一个
        this.page++
        this.getGoodsList(true)
      },500) //滚动加载是累加数据，并不是只显示一页数据，so需要传参去请求数据的地方判断一下
    },
    closeModal() {
      this.mdShow = false 
      this.mdShowCart = false
    },
    addCart(productId) {
      axios.post("/goods/addCart",{
        productId:productId
      }).then( res => {
        var res = res.data
        if(res.status == 0){
          this.mdShowCart = true
        }else {
          this.mdShow = true //弹出未登录模态框，提示去登录
        }
      })

    }
  }

}
</script>

<style>

</style>
