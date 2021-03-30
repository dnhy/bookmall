<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration=2000){
      this.message=message
      this.isShow=true

      setTimeout(()=>{
       this.isShow=false
        this.message=''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    /*根据自己的高度和宽度偏移*/
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    z-index: 999;
  }
</style>