<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    {{students}}
  </div>
</template>

<script>
import {getBookTest} from '@/network/home'
import axios from 'axios'
export default {
  name:'App',
  data(){
    return{
      students:''
    }
  },
  components:{

  },
  created() {
    const _this = this
    axios.get('http://127.0.0.1:8080/book/findById').then(function (resp) {
      //在此不能直接用 this.students = resp.data，因为此处的this指的不是vue对象，而是回调
      _this.students = resp.data
      console.log(resp);
    })
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
