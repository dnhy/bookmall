<template>
  <div id="app">
    <div id="nav">
      <keep-alive exclude="Detail">
        <router-view/>
      </keep-alive>
      <main-tab-bar/>
    </div>
  </div>
</template>

<script>
import MainTabBar from "components/contents/mainTabbar/MainTabBar";
export default {
  name:'App',
  data(){
    return{
    }
  },
  components:{
    MainTabBar,
  }
}
</script>
<style>
@import "./assets/css/base.css";
</style>
