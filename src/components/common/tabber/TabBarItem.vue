<template>
  <div class="tab-bar-item " @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    class会在slot被替换后丢失，所以必须写在外层-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
  export default {
    name: "TabBarItem",
    props:{
       path:String,
       activeColor:{
         type:String,
         default:'deeppink'
       }
    },
    computed:{
      ...mapGetters(['user']),
      isActive(){
        // console.log("this.$route.path:"+this.$route.path)
        // console.log("this.path:"+this.path)
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        //style，class可以跟对象，类都需要放到对象中
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        if(this.$route.path !== this.path) {
          if (this.path==='/cart'||this.path==='/user'){
            if (Object.keys(this.user).length === 0){
              this.$router.push('/login')
            } else {
              this.$router.push(this.path)
            }
          } else {
            this.$router.push(this.path)
          }

        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;

  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  .active{
    color: #d4237a;
  }
</style>
