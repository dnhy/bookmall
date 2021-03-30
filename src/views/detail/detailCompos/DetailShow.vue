<template>
  <div id="detailshow">
    <div class="conditon">品相描述：{{books.condition}}</div>
    <div class="introduction">
      <p>简介</p>
      <span>{{books.introduction}}</span>
      <img :src="books.coverImage" alt="" @load = 'imageLoad'>
    </div>
  </div>

</template>
<script>
export default {
  name: "DetailShow",
  methods:{
    imageLoad() {
       this.$bus.$emit('itemImageLoad')
    }
  },
  props:{
    books:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  #detailshow{
    margin-top: 15px;
  }
  .conditon,.introduction{
    color: black;
    font-weight: bold;
    padding: 10px;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
  .introduction p{
    margin-bottom: 20px;
  }
  .introduction span{
    color: black;
    font-weight: normal;
    font-family: "仿宋";
  }
  .introduction img{
    width: 100%;
  }
</style>