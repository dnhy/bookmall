<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-bar-item"
         :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    },
    currentIndexProps:{
      type:Number,
      default() {
        return 0;
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  },
  created() {

  },
  mounted() {

  },
  activated() {
    this.currentIndex=this.currentIndexProps
    console.log('this.currentIndex:'+this.currentIndex);
  },
  deactivated() {
    this.currentIndex=0
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-bar-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-bar-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
