<template>
  <div id="login">
    <nav-bar>
      <div slot="left" @click="back">X</div>
      <div slot="center">登录</div>
    </nav-bar>
    <div class="login-info">
      <el-input class="input" placeholder="请输入用户名" v-model="userName" clearable></el-input>
      <el-input class="input" placeholder="请输入密码" v-model="password" show-password></el-input>
      <el-button class="btn-sub" type="primary" @click="sub" :disabled="testDisabled">登录</el-button>
    </div>
    <div class="register">注册</div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {findUser} from "@/network/user";
import {mapActions} from "vuex";

Vue.use(ElementUI)

export default {
  name: "Login",
  components: {
    NavBar
  },
  data(){
    return{
      userName:'',
      password:'',
      disabled:false,
      loginRes:0,
      userList:[]
    }
  },
  computed:{
    testDisabled(){
      return this.userName===''||this.password===''
    }
  },
  methods:{
    ...mapActions(['addUser']),
    back(){
      this.$router.back()
    },
    sub(){
      for (let item of this.userList){
        if (item.userName === this.userName && this.password === item.password){
          this.loginRes = 1
          this.addUser(item).then(res=>{
            this.$toast.show(res,2000)
          })
          this.$router.replace('/home')
        }else {
          this.$toast.show('账号或密码错误！',2000)
        }
      }
    }
  },
  created() {
    findUser().then(res=>{
      this.userList=res
    })

  }
}
</script>

<style scoped>
  #login{
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 999;
  }

  .login-info{
    width: 80%;
    margin: 30px auto;
  }
  .input{
    margin-bottom: 20px;
  }
  .btn-sub{
    width: 100%;
  }
  .register{
    width: 80%;
    margin: -17px auto;
    text-align: right;
  }
</style>