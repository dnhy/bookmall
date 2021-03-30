<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center"><Search/></div><div slot="right">登录</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll"
            :pull-up-load="true" @pullingUp="loadMore">
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

import {getHomeMultidata,getBookAll,getBookByPage} from '@/network/home'
 export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommend:[],
        isShowBackTop:false,
        saveY:0,
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
     getHomeMultidata(){
       getHomeMultidata().then(res=>{
         this.banners=res.data.banners
         this.recommend=res.data.recommends
       })
     },
     getAll(){
       getBookAll().then(res=>{
         this.goods=res
         console.log(this.goods)
       })
     },
     getBookByPage(){
       getBookByPage(++this.goods.page).then(res=>{
         //每次往后读30个数据放入list中（使用数组结构）
         this.goods.list.push(...res)
         //调一下finishPullUp才能继续上拉加载
         this.$refs.scroll.finishPullUp()
         console.log(this.goods.list);
       })
     },
     backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
     },
     scroll(position){
       this.isShowBackTop=(-position.y)>100
     },
     loadMore(){
       this.getBookByPage()
     }
   },
   //进来
   activated() {
      //这个scroll()的time不能设为0
     this.$refs.scroll.scrollTo(0,this.saveY,500)
     this.$refs.scroll.refresh()
   },
   //离开
   deactivated() {
     this.saveY=this.$refs.scroll.scroll.y
     this.$refs.scroll.refresh()
     // console.log(this.saveY);
   },
   created() {
      this.getHomeMultidata()
      this.getBookByPage()
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
    height: calc(100vh - 44px - 49px);
  }

  .home-nav{
    /*color: #fff;*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
