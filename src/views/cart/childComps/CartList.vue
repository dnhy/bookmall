<template>
  <div id="cart-list">
    <scroll class="content" ref="scroll" :pullUpLoad="true">
      <cart-list-item class="cart-list-item" v-for="item in cartList" :key="item.value" :cart-list-item="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #cart-list{
    /*视口高度减上下导航栏，就是list高度*/
    height: calc(100vh - 44px - 49px - 40px);
    background-color: #efefef;
    margin-top: 5px;

  }
  .content{
    /*滚动的内容高度应该与list等高*/
    height: 100%;
    overflow: hidden;
  }
  .cart-list-item{
    margin: 5px 5px 0 5px;
    border-radius: 10px;
  }
</style>