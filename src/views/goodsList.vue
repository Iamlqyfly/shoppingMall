<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>

        <div class="goods-list">
            <div class="goods-list-content">
                <div class="filter-goods">
                    <span class="sortby">Sort By:</span>
                    <a href="javascript:void(0)" class="default">Default</a>
                    <a href="javascript:void(0)" class="price">Price</a>
                </div>
                <div class="goods-list-result">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)"></a></dd>
                        <dd v-for="price in priceFilter" :key="price.id">
                            <a href="javascript:void(0)">
                            </a>
                        </dd>
                    </dl>
                </div>

                <div class="goods-display-list">
                    <div class="goods-display">
                        <ul>
                            <li v-for="item in goodsList" :key="item.id">
                                <div class="pic">
                                    <a href="#">
                                        <img src="" alt="">
                                    </a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn">加入购物车</a>
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
export default {

}
</script>

<style>

</style>
