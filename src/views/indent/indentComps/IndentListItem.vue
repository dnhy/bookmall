<template>
  <div id="item">
    <div class="seller">
      <img src="~assets/img/indent/mall.svg" alt="卖家">
      <div class="seller-name">{{sellerName}}</div>
    </div>
    <div class="Indent-list-item">
      <div class="item-img">
      <img :src="IndentListItem.image" alt="商品图片" @load="imgLoad">
    </div>
      <div class="item-info">
      <div class="item-title">{{IndentListItem.title}}</div>
      <div class="item-desc">{{IndentListItem.cond}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥ <span>{{priceFirst}}.</span>
          <span class="item-price-after">{{priceLast}}</span></div>
        <div class="item-count right">{{IndentListItem.count}} 件</div>
      </div>
    </div>
    </div>
    <div class="service">
      <div class="serv-title">配送方式</div>
      <div class="serv-name">{{serveType}}</div>
    </div>
    <div class="subtotal">
      <div class="subtotal-title"> </div>
      <div class="subtotal-name">{{subtotal}}</div>
    </div>
  </div>
</template>

<script>

import {getDetail, myBooks} from "@/network/detail";

export default {
  name: "IndentListItem",
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
      books:[]
    }
  },
  methods:{
    checkClick(){
      this.IndentListItem.checked = !this.IndentListItem.checked
    },
    imgLoad(){
      this.$bus.$emit('castItemLoad')
    }
  },
  computed:{
    priceFirst(){
      return String(this.IndentListItem.price).split('.')[0]
    },
    priceLast(){
      return String(this.IndentListItem.price).split('.')[1]
    },
    sellerName(){
      return this.books.seller
    },
    serveType(){
      if (this.books.servicePrice!==0)
        return this.books.servName+':￥'+this.books.servicePrice
      else
        return this.books.servName
    },
    subtotal(){
      let sub=this.books.price*1+this.IndentListItem.price*1
      return '共'+this.IndentListItem.count+'件商品，小计￥'+sub
    }
  },
  created() {
    getDetail(this.IndentListItem.id).then(res=>{
      this.books=new myBooks(res);
    })
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
    padding: 10px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dedcdc;
  }
  .seller img{
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
    width: 80px;
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
    width: 180px;
  }
</style>