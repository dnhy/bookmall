<template>
  <div class="search">
    <el-col>
      <el-input
          @focus="focus"
          @blur="blur"
          placeholder="搜索商家或地点">
        <el-button slot="append" icon="el-icon-search" id="search"></el-button>
      </el-input>
    <el-card v-if="isSearch" >...</el-card>
    </el-col>


  </div>

</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

export default {
  name: "search",
  data(){
    return{
      isFocus:''
    }
  },
  methods:{
    focus(){
      this.isFocus=true
    },
    blur(){
      this.isFocus=false
    }
  },
  computed: {
    isSearch() {
      console.log(this.isFocus)
      return this.isFocus;
    }
  }
}
</script>

<style scoped>
  .search{
    display: flex;
  }
</style>