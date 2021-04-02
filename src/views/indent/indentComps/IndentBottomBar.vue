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
      提交订单
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
import {addIdentIn,updateIndent} from "@/network/indent";
Vue.use(ElementUI)

export default {
  name: "CartBottomBar",
  components:{
    Dialog
  },
  data() {
    return {
      dialogVisible: false,
      indentInfo:[]
    };
  },
  computed:{
    ...mapGetters(['cartList','user']),
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
      //indentInfo是表1
      //应当向cartlist中取数据
      const indentList=this.cartList.filter((item)=>item.checked)
      const date=new Date()


      for(let i=0;i<indentList.length;i++){
        let myIndent={}
        myIndent.indentId=formatDateIndent(date)+indentList[0].uId
        myIndent.indentId+=indentList[i].id
        console.log(indentList);
        myIndent.userId=this.user.userId
        myIndent.addressId=this.user.userAddress
        myIndent.bookId=indentList[i].id
        myIndent.count=indentList[i].count
        myIndent.indentTime=formatDate(date)
        myIndent.isPay='no'
        myIndent.isSend='no'
        myIndent.isReceive='no'
        myIndent.isComplete='no'
        this.indentInfo.push(myIndent)
        //数据库插入订单
        addIdentIn(myIndent)
      }
      //删除cartList中的选择数据（已提交）
      this.deleteCartChecked()


      // for (let item of indentList) {
      //   //indentInfo2是表2
      //   const indentInfo2 = {}
      //   indentInfo2.indentId = this.indentInfo.indentId;
      //   indentInfo2.bookId = item.id;
      //   indentInfo2.count = item.count;
      //   //数据库插入订单详情
      //   console.log(indentInfo2);
      //   addIntentDetailIn(indentInfo2)
      // }
    },
    payFail(){
      this.dialogVisible = false
    },
    paySuccess(){
      //付款成功修改数据库
      for (let item of this.indentInfo){
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