<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center"><Search/></div><div slot="right">登录</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll" :pull-up-load=true>
      <home-swiper :banners="banners"/>
      <HomeRecommendView :recommend="recommend"/>
      <HomeGoodsList :goods="goods.list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Search from "@/components/common/search/Search";
import HomeSwiper from "@/views/home/childComp/HomeSwiper";
import HomeRecommendView from "@/views/home/childComp/HomeRecommendView";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/contents/backTop/BackTop";
import HomeGoodsList from "@/components/contents/books/HomeGoodsList";

import {getHomeMultidata,getBookAll,getBookByPage,getBookTypePage} from '@/network/home'
 export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommend:[],
        isShowBackTop:false,
        goods:{
          page:0,
          list:[]
        }
      }
    },
    components:{
      NavBar,
      Search,
      HomeSwiper,
      HomeRecommendView,
      Scroll,
      BackTop,
      HomeGoodsList
    },
   methods:{
      //刷新频繁的函数防抖动
     debounce(func ,delay){
       let timer=null
       return function (...args){
         if (timer) clearTimeout(timer)
         timer=setTimeout(()=>{
           func.apply(this,args)
         },delay)
       }
     },
     backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
     },
     scroll(position){
       this.isShowBackTop=(-position.y)>100
     }
   },
   //进来
   activated() {
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()
   },
   //离开
   deactivated() {
     this.saveY=this.$refs.scroll.scroll.y
   },
   created() {
     var that = this;
      getHomeMultidata().then(res=>{
        that.banners=res.data.banners
        that.recommend=res.data.recommends
      });
      // getBookAll().then(res=>{
      //   that.goods=res
      //   console.log(that.goods)
      // })
     getBookByPage(1).then(res=>{
       that.goods.list=res
       console.log(that.goods.list);
     })
   },
   mounted() {
     const refresh=this.debounce(this.$refs.scroll.refresh)
     this.$bus.$on('itemImageLoad', () => {
       //this.$refs在created中很有可能拿不到，因为dom有可能在created后加载
       // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
     })
   }
 }
</script>

<style scoped>
  #home{
    position: relative;
    background-color: #fff;
    height: 100vh;
  }

  .home-nav{
    /*color: #fff;*/
    position: relative;
    z-index: 9;
  }

  .content{
    height: calc(100% - 44px);
  }
</style>
