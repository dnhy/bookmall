<template>
  <div id="Indent">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">确认订单</div>
    </nav-bar>
    <Indent-list/>
    <IndentBottomBar/>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import IndentList from "@/views/indent/indentComps/IndentList";
import IndentBottomBar from "@/views/indent/indentComps/IndentBottomBar";
import Dialog from "@/components/common/dialog/Dialog";

import {mapGetters} from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
export default {
  name: "Indent",
  components:{
    NavBar,
    IndentList,
    IndentBottomBar,
    Dialog
  },
  computed:{
    // IndentLength(){
    //   return this.$store.getters.IndentLength
    // }
    //进行解构
    // ...mapGetters(['IndentLength'])
    ...mapGetters({
      length:'cartLength'
    })
  },
  methods:{
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
#Indent{
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9;
}
.nav-bar{
  background-color: #fff;
}
.back{
  margin-top: 5px;
}
</style>