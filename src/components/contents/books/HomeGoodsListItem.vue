<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="goodsItem.coverImg" alt="" @load = 'imageLoad'>
    <div class="goods-info">
      <div>{{goodsItem.bookName}} {{goodsItem.author}} {{goodsItem.type}}</div>
      <p class="intro">{{goodsItem.introduction}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeGoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.bookId)
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.goods-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  /*padding: 2px;*/
}
.goods-item img {
  width: 40%;
  padding: 5px;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  padding: 10px 0;
  width: 60%;
}
.goods-info div {
  overflow: hidden;
  text-overflow: ellipsis;
  /*word-break:keep-all;*/
  white-space: nowrap;
  margin-bottom: 3px;
  font-size: 15px;
  font-weight: bold;
}
.goods-info .intro {
  color: var(--color-hint-text);
  margin-top: 20px;
  margin-right: 20px;
  display: -webkit-box;
  -webkit-line-clamp:2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
/*.goods-info .collect {*/
/*  position: relative;*/
/*}*/
/*.goods-info .collect::before {*/
/*  content: '';*/
/*  position: absolute;*/
/*  left: -15px;*/
/*  top: -1px;*/
/*  width: 14px;*/
/*  height: 14px;*/
/*  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;*/
/*}*/
</style>