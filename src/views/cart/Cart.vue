<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <CartBottomBar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";


import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
      //进行解构
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      }),
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: #fff;
  }
</style>