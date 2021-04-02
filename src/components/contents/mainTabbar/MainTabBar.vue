<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabber/home.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabber/home-2.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabber/file-.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabber/file--2.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabber/shop-cart-.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabber/shop-cart--2.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/user">
      <img slot="item-icon" src="~assets/img/tabber/user.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabber/user-2.png" alt="">
      <div slot="item-text">用户</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabber/TabBar";
import TabBarItem from "components/common/tabber/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
