<template>
  <div class="base-info">
    <div class="avatar">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="info">
      <div class="name">{{user.userName}}</div>
      <div class="简介">{{user.instruction}}</div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "ProfileBaseInfo",
  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
  .base-info{
    display: flex;
    align-items: center;
    /*background-color: #fff;*/
    /*margin: 5px 5px 0 5px;*/
    /*border-radius: 10px;*/
  }
  .avatar img{
    width: 100px;
    margin-left: 30px;
  }
  .info{
    flex: 1;
    margin-left: 10px;
  }
  .name{
    font-size: 30px;
  }
</style>