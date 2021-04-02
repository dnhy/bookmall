<template>
  <div id="Indent-list">
    <scroll class="content" ref="scroll" :pullUpLoad="true">
      <Indent-list-item class="Indent-list-item" v-for="(item,index) in indentList" :key="item.value" :indent-list-item="item" :index="index"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import IndentListItem from "@/views/indent/indentComps/IndentListItem";

import {mapActions, mapGetters} from 'vuex'

export default {
  name: "IndentList",
  components:{
    Scroll,
    IndentListItem
  },
  computed:{
    ...mapGetters(['indentList'])
  },
  methods:{
    ...mapActions(['showCart']),
    debounce(func ,delay){
      let timer=null
      return function (...args){
        if (timer) clearTimeout(timer)
        timer=setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
  },
  mounted() {
    const refresh=this.debounce(this.$refs.scroll.refresh)
    this.$bus.$on('castItemLoad',()=>{
      refresh()
    })
  },
  created() {
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #Indent-list{
    /*视口高度减上下导航栏，就是list高度*/
    height: calc(100vh - 44px  - 40px);
    background-color: #efefef;
    margin-top: 5px;

  }
  .content{
    /*滚动的内容高度应该与list等高*/
    height: 100%;
    overflow: hidden;
  }
  .Indent-list-item{
  }
</style>