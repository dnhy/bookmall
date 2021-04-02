<template>
  <div id="Indent">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">我的订单</div>
    </nav-bar>
    <tab-control ref="tabControl"
                 :titles="['全部','待付款','待发货','待收货','已完成']"
                 :current-index-props="typeId"
                 @tabClick="tabClick" v-if="update"/>
    <indent-all-list :indent-all="showIndent"/>

    <indent-all-bottomBar :indent-all="indentAll"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import IndentAllList from "@/views/indentAll/indentComps/IndentAllList";
import IndentAllBottomBar from "@/views/indentAll/indentComps/IndentAllBottomBar";
import Dialog from "@/components/common/dialog/Dialog";
import TabControl from "@/components/contents/tabControl/TabControl";
import {mapGetters} from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
import {findIndentAll} from "@/network/indent";
Vue.use(ElementUI);
export default {
  name: "Indent",
  data(){
    return{
      indentAll:[],
      indentType:{
        'all':[],
        'waitPay':[],
        'waitSend':[],
        'waitReceive':[],
        'completed':[]
      },
      currentType:'',
      tabOffsetTop:0,
      typeId:0,
      update:true
    }
  },
  components:{
    NavBar,
    IndentAllList,
    IndentAllBottomBar,
    Dialog,
    TabControl
  },
  computed:{
    // IndentLength(){
    //   return this.$store.getters.IndentLength
    // }
    //进行解构
    // ...mapGetters(['IndentLength'])
    ...mapGetters({
      length:'cartLength'
    }),
    showIndent(){
      return this.indentType[this.currentType]
    }
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    //tips:函数不写（参数）：v-on传递参数、没有参数、传入函数而不是返回值
    //tabControll
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'all'
          break;
        case 1:
          this.currentType = 'waitPay'
          break;
        case 2:
          this.currentType = 'waitSend'
          break;
        case 3:
          this.currentType = 'waitReceive'
          break;
        case 4:
          this.currentType = 'completed'
          break;
      }
    },
    backClick(){
      this.$router.back()
    }
  },
  /**
   * 生命周期函数
   */
  created() {

  },
  mounted() {
    //$el获取组建中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
    this.typeId=this.$route.params.type_id*1
    console.log('mounted:'+this.typeId);
  },
  //actived的时候，先进行渲染再执行js
  activated() {
    //路由拿到的是String
    this.typeId=this.$route.params.type_id*1
    this.tabClick(this.typeId)
    console.log('actived');
    console.log(this.typeId)
    console.log(this.currentType);
    //获取所有订单信息
    findIndentAll(1).then(res=>{
      this.indentAll=res
      //对请求到的数据进行分类存放
      this.indentType.all=this.indentAll

      this.indentType.waitPay=this.indentAll.filter(item=>{
        return item.isPay==='no'
      })
      this.indentType.waitSend=this.indentAll.filter(item=>{
        return item.isPay==='yes' && item.isSend==='no'
      })
      this.indentType.waitReceive=this.indentAll.filter(item=>{
        return item.isPay==='yes' && item.isSend==='yes' &&
            item.isReceive==='no'
      })
      this.indentType.completed=this.indentAll.filter(item=>{
        return item.isPay==='yes' && item.isSend==='yes' &&
            item.isReceive==='yes' && item.isComplete === 'yes'
      })
    })
    // console.log(this.indentAll);
  },
  /**
   * 其他
   */
  //组件刷新
  reload(){
    // 移除组件
    this.update = false
    // 在组件移除后，重新渲染组件
    // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
    this.$nextTick(() => {
      this.update = true
    })
  }
}
</script>

<style scoped>
#Indent{
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9;
}
.nav-bar{
  background-color: #fff;
}
.back{
  margin-top: 5px;
}
</style>