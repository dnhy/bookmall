<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :pull-up-load="true" @scroll="detailScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <DetailBaseInfo :books="books" ref="params"/>
      <detail-show :books="books" ref="intros" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>


import DetailNavBar from "@/views/detail/detailCompos/DetailNavBar";
import DetailSwiper from "@/views/detail/detailCompos/DetailSwiper";
import DetailBaseInfo from "@/views/detail/detailCompos/DetailBaseInfo";
import DetailShow from "@/views/detail/detailCompos/DetailShow";
import DetailBottomBar from "@/views/detail/detailCompos/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";


import {getDetail,myBooks} from "@/network/detail";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  data(){
    return{
      book_id:null,
      topImages:[],
      books:{},
      themeTopYs:[],
      currentIndex:0
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShow,
    Scroll,
    DetailBottomBar
  },
  methods:{
    ...mapActions(['addCart']),
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
    titleClick(index){
      this.$refs.scroll.scrollTo(0,this.themeTopYs[index],500)
    },
    detailScroll(position){
      const positionY=-position.y
      const length=this.themeTopYs.length
      for (let i=0;i<length;i++){
        // if (positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i*1+1]){
        //
        // }
        if(this.currentIndex!==i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i === length-1 && positionY>=this.themeTopYs[i]))){
          this.currentIndex = i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
    },
    addToCart() {
      //1.获取商品信息
      const product={}
        product.image=this.topImages[0]
        product.title=this.books.bookName
        product.desc=this.books.introduction
        product.cond=this.books.condition
        product.price=this.books.price
        product.servicePrice=this.books.servicePrice
        product.id=this.books.bookId
        product.count=this.books.count
        product.uId=1
      //2.将商品信息添加到购物车
      this.addCart(product).then(res=>{
        this.$toast.show(res,2000)

      })
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // })

    }
  },

  //拿不到加载的数据和组件
  created() {
    this.book_id=this.$route.params.book_id
    getDetail(this.book_id).then(res=>{
      //把获取的数据整合到对象中
      this.books=new myBooks(res);
      this.topImages.push(this.books.coverImage)
      this.topImages.push(this.books.introImage)

      //渲染完dom后，但是图片没有渲染完，获取的offsetTop不包含图片，offset不对一般都是图片的问题
      this.$nextTick(()=>{
        this.themeTopYs.push(0)
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.intros.$el.offsetTop)
        //console.log(this.themeTopYs);
      })
    })
  },
  //能拿到组件，不一定能拿到数据
  mounted() {
    const refresh=this.debounce(this.$refs.scroll.refresh)
    this.$bus.$on('itemImageLoad', () => {
    //this.$refs在created中很有可能拿不到，因为dom有可能在created后加载
    // this.$refs.scroll && this.$refs.scroll.refresh()
    refresh()
    })
  },
  //获取数据后但未渲染
  updated() {
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(-this.$refs.intros.$el.offsetTop)
    // console.log(this.themeTopYs);
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