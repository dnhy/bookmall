<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.value">
      <a :href="item.link">
        <img :src="item.img" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}

</script>

<style scoped>
img{
  height: 150px;
}
</style>
