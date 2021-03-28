<template>
  <div class="goods">
    <home-goods-list-item v-for="(item,id) in goods" :goodsItem="item" :key="id"/>
  </div>
</template>

<script>
import HomeGoodsListItem from "@/components/contents/books/HomeGoodsListItem";
export default {
  name: "booksList",
  components:{
    HomeGoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*justify-content: space-around;*/
  /*padding: 2px;*/
}
</style>