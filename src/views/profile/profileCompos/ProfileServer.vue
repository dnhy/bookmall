<template>
  <div class="server">
    <div class="server-title">
      <div class="title">我的服务</div>
    </div>
    <div class="server-bar">
      <div class="server-item">
        <img src="~assets/img/profile/locate.svg" alt="">
        <div class="server-category">
          我的收货地址
        </div>
      </div>
      <div class="server-item">
        <img src="~assets/img/profile/books.svg" alt="">
        <div class="server-category">
          我买到的书
        </div>
      </div>
      <div class="server-item" @click="logout">
        <img src="~assets/img/common/log-out.svg" alt="">
        <div class="server-category">
          退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {mapActions} from "vuex";

export default {
  name: "ProfileServer",
  methods:{
    ...mapActions(['deleteUser']),
    logout(){
      this.deleteUser().then(res=>{
        this.$toast.show(res,2000)
        this.$router.replace('/home')
      })
    }
  },
  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.server{
  background-color: #fff;
  padding: 10px 0;
  margin: 5px 5px 0 5px;
  border-radius: 10px;

}
.server-title{
  display: flex;
  padding: 5px 0 15px 0;
  border-bottom: 1px solid #dedcdc;
}
.title{
  flex: 1;
  padding-left: 10px;
}
.server-bar{
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px 0;
}
.server-item{
  flex: 1;
}
.server-item img{
  width: 20px;
  margin: 5px 0;
}
</style>