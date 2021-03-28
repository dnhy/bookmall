<template>
<div class="recommend">
  <div v-for="item in recommend" class="recommend-item">
    <a :href="item.link">
      <img :src="item.img" alt="">
<!--      <div>{{item.title}}</div>-->
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style scoped>
  .recommend{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 8px 5px;

    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    width: 49%;
    position: relative;
  }
  .recommend-item img{
    width: 100%;

    /*margin-bottom: 10px;*/
  }
</style>
