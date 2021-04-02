<template>
  <div id="item">
    <div class="seller">
      <div class="seller-item">
        <img src="~assets/img/indent/mall.svg" alt="卖家">
        <div class="seller-name">{{sellerName}}</div>
      </div>
      <div class="tip">{{instruction(IndentListItem.isPay)}}</div>
    </div>
    <div class="Indent-list-item">
      <div class="item-img">
      <img :src="IndentListItem.coverImg" alt="商品图片" @load="imgLoad">
    </div>
      <div class="item-info">
      <div class="item-title">{{IndentListItem.bookName}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥ <span>{{priceFirst}}.</span>
          <span class="item-price-after">{{priceLast}}</span></div>
        <div class="item-count right">{{IndentListItem.count}} 件</div>
      </div>
    </div>
    </div>
    <div class="service">
      <div class="serv-title"></div>
      <div class="serv-name">{{subtotal}} <span>(包含{{serveType}})</span></div>
    </div>
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
    <div class="subtotal">
      <div class="subtotal-title"> </div>
      <div class="subtotal-name"><span :class="{hidden:isHidden}" @click="pay">付款</span></div>
    </div>
  </div>
</template>

<script>

import {getDetail, myBooks} from "@/network/detail";
import {updateIndent} from "@/network/indent";
import {formatDate} from "@/common/utils";

export default {
  name: "IndentListAllItem",
  props:{
    IndentListItem:{
      type:Object,
      default(){
        return {}
      }
    },
    index:{
      type:Number,
      default() {
        return 0;
      }
    }
  },
  data(){
    return{
      books:[],
      indentInfo:{},
      dialogVisible: false,
      isHidden: false,
      myIndent:{},
      isPay:''
    }
  },
  methods:{
    checkClick(){
      this.IndentListItem.checked = !this.IndentListItem.checked
    },
    imgLoad(){
      this.$bus.$emit('castItemLoad')
    },
    instruction(isPay){
      this.IndentListItem.isPay = isPay
      return this.IndentListItem.isPay==='yes'?'已付款':'等待买家付款'
    },
    pay(){
      
      console.log(this.IndentListItem);
      this.myIndent.indentId=this.IndentListItem.indentId
      this.myIndent.userId=1
      this.myIndent.addressId=1
      this.myIndent.bookId=this.IndentListItem.bookId
      this.myIndent.count=this.IndentListItem.count
      this.myIndent.indentTime=this.IndentListItem.indentTime
      this.myIndent.isPay=this.IndentListItem.isPay
      this.myIndent.isSend=this.IndentListItem.isSend
      this.myIndent.isReceive=this.IndentListItem.isReceive
      this.myIndent.isComplete=this.IndentListItem.isComplete

      console.log(this.myIndent);

      this.dialogVisible=true
    },
    paySuccess(){
      this.isHidden=true
      //付款成功修改数据库
      this.myIndent.isPay='yes'
      updateIndent(this.myIndent)
      this.dialogVisible=false
      this.IndentListItem.isPay='yes'
    },
    payFail(){
      this.dialogVisible=false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },
  computed:{
    priceFirst(){
      return String(this.books.price).split('.')[0]
    },
    priceLast(){
      return String(this.books.price).split('.')[1]
    },
    sellerName(){
      return this.books.seller
    },
    serveType(){
      if (this.books.servicePrice!==0)
        return this.books.servName+':￥'+this.books.servicePrice
      else
        return '邮费:￥0'
    },
    subtotal(){
      let sub=this.books.price*1+this.IndentListItem.servicePrice*1
      return '共'+this.IndentListItem.count+'件商品，小计￥'+sub
    },

  },
  created() {
    getDetail(this.IndentListItem.bookId).then(res=>{
      this.books=new myBooks(res);
    })
    this.isHidden = this.IndentListItem.isPay === 'yes';
  }
}
</script>

<style scoped>
  #item{
    display: block;
    background-color: #fff;
    padding-top: 5px;
    margin: 5px 5px 0 5px;
    border-radius: 10px;

  }
  .seller{
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #dedcdc;
  }
  .hidden{
   visibility: hidden;
  }
  .tip{
    width: 150px;
    text-align: center;
    color: red;
  }
  .seller-item{
    flex: 1;
    padding: 10px 20px;
    display: flex;
    align-items: center;
  }
  .seller-item img{
    width: 25px;
    margin-right: 10px;
  }
  .seller-name{

  }
  .Indent-list-item{
    display: flex;
    padding-top: 10px;
  }

  .item-img{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px 0 5px;
  }

  .item-img img{
    width: 100%;
  }

  .item-info{
    flex: 3;
  }
  .item-info>div{

  }

  .item-desc{
    margin-bottom: 15px;
    padding: 5px;
    display: inline-block;
    background-color: #efefef;
    border-radius: 5px;
    font-size: 12px;
  }

  .item-title{
    margin-top: 5px;
    margin-bottom: 6px;
    display: -webkit-box;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }

  .info-bottom{
    display: flex;
    margin-bottom: 15px;
  }
  .left{
    flex: 1;
  }
  .right{
    width: 55px;
  }

  .item-price{
    color: red;
  }
  .item-price-after{
   font-size: 5px;
  }
  .service{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }
  .serv-title{
    flex: 1;
    padding-left: 20px;
  }
  .serv-name{
    width: 280px;
    text-align: center;
  }
  .serv-name span{
    color: var(--color-hint-text);
  }
  .subtotal{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }
  .subtotal-title{
    flex: 1;
    padding-left: 20px;
  }
  .subtotal-name{
    width: 120px;
    text-align: center;
  }
  .subtotal-name span{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: red;
    border: 1px solid red;
    border-radius: 30px;
  }
</style>