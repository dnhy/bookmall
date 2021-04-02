<template>
  <div class="bottom-bar">
    <el-dialog
        title="支付"
        :visible.sync="dialogVisible"
        width="80%"
        :append-to-body="true"
        :before-close="handleClose">
      <span>确定支付该订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payFail">取 消</el-button>
        <el-button type="primary" @click="paySuccess">确 定</el-button>
      </span>
    </el-dialog>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate" @click="pay">
      批量支付
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import Dialog from "@/components/common/dialog/Dialog";

import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {formatDate, formatDateIndent} from "@/common/utils";
import {addIdentIn, updateIndent,findIndentAll} from "@/network/indent";
Vue.use(ElementUI)

export default {
  name: "CartBottomBar",
  components:{
    Dialog
  },
  props:{
    indentAll:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      dialogVisible: false,
      indentInfo:[],
      indentList:[]
    };
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
      },0)
    },
    checkLength(){
      return this.cartList.filter(item=>{
        return item.checked
      }).length
    },
    isSelectAll(){
      //先判断数组是否为空，空为false，不空为true
      //数组不空，再看没选中的长度，没选中的长度为0表示全选，返回true
      // return this.cartList.length && !this.cartList.filter((item)=>{
      //   return !item.checked
      // }).length
      return this.cartList.length > 0 && !this.cartList.find(item=>!item.checked)
    },
  },
  methods:{
    ...mapActions(['addIndentShow','deleteCartChecked']),
    selectAll(){
      if (this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }else{
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    pay(){
      this.dialogVisible=true
      this.indentList=this.indentAll
      // const indentList=this.cartList.filter((item)=>item.checked)
      //不应当在组件中向数据库请求数据，会有异步的问题
      // const userId=1
      // findIndentAll(1).then(res=>{
      //   this.indentList=res
      //   console.log(this.indentList);
      // })
      console.log(this.indentList);
      const date=new Date()
      for(let i=0;i<this.indentList.length;i++){
        let myIndent={}
        myIndent.indentId=this.indentList[i].indentId
        console.log(myIndent.indentId);
        myIndent.userId=1
        myIndent.addressId=1
        myIndent.bookId=this.indentList[i].bookId
        myIndent.count=this.indentList[i].count
        myIndent.indentTime=this.indentList[i].indentTime
        myIndent.isPay=this.indentList[i].isPay
        myIndent.isSend=this.indentList[i].isSend
        myIndent.isReceive=this.indentList[i].isReceive
        myIndent.isComplete=this.indentList[i].isComplete
        this.indentInfo.push(myIndent)
        console.log(myIndent);
      }
      // //删除cartList中的选择数据（已提交）
      // this.deleteCartChecked()

    //   for (let item of indentList) {
    //     const indentInfo2 = {}
    //     indentInfo2.indentId = indentInfo.indentId;
    //     indentInfo2.bookId = item.id;
    //     indentInfo2.count = item.count;
    //     //数据库插入订单详情
    //     console.log(indentInfo2);
    //     addIntentDetailIn(indentInfo2)
    //   }
    },
    payFail(){
      this.dialogVisible = false
    },
    paySuccess(){
      console.log(this.indentInfo);
      //付款成功修改数据库
      for (let item of this.indentInfo){
        console.log(item);
        item.isPay='yes'
        updateIndent(item)
      }
      this.dialogVisible = false
      this.$router.go(-1);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    line-height: 40px;
    display: flex;
  }

  .check-content{
    display: flex;
    align-items: center;
    width: 100px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .price{
    margin-left: 30px;
    flex: 1;
  }

  .calculate{
    width: 90px;
    text-align: center;
    background-color: #e54747;
    color: #fff;
  }
</style>