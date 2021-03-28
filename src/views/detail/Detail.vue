<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll" :pull-up-load="true">
      <detail-swiper :top-images="topImages"/>
      <DetailBaseInfo :books="books"/>
      <detail-show :books="books"/>
    </scroll>
  </div>
</template>

<script>


import DetailNavBar from "@/views/detail/detailCompos/DetailNavBar";
import DetailSwiper from "@/views/detail/detailCompos/DetailSwiper";
import DetailBaseInfo from "@/views/detail/detailCompos/DetailBaseInfo";
import DetailShow from "@/views/detail/detailCompos/DetailShow";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail,myBooks} from "@/network/detail";



export default {
  name: "Detail",
  data(){
    return{
      book_id:null,
      topImages:[],
      books:{}
    }
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
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShow,
    Scroll
  },
  mounted() {
    const refresh=this.debounce(this.$refs.scroll.refresh)
    this.$bus.$on('itemImageLoad', () => {
      //this.$refs在created中很有可能拿不到，因为dom有可能在created后加载
      // this.$refs.scroll && this.$refs.scroll.refresh()
      refresh()
    })
  },
  created() {
    this.book_id=this.$route.params.book_id
    getDetail(this.book_id).then(res=>{
      //把获取的数据整合到对象中
      this.books=new myBooks(res);
      this.topImages.push(this.books.coverImage)
      this.topImages.push(this.books.introImage)
    })
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
   height: calc(100% - 44px);
  }
</style>