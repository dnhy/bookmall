<template>
  <div id="cart-list-item">
    <div class="item-selector">
      <CheckButton :is-checked="cartListItem.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="cartListItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartListItem.title}}</div>
      <div class="item-desc">{{cartListItem.cond}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥ <span>{{priceFirst}}.</span>
          <span class="item-price-after">{{priceLast}}</span></div>
        <div class="item-count right">{{cartListItem.count}} 件</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/contents/checkButton/CheckButton";

export default {
  name: "CartListItem",
  props:{
    cartListItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkClick(){
      this.cartListItem.checked = !this.cartListItem.checked
    }
  },
  components:{
    CheckButton
  },
  computed:{
    priceFirst(){
      return String(this.cartListItem.price).split('.')[0]
    },
    priceLast(){
      return String(this.cartListItem.price).split('.')[1]
    }
  }
}
</script>

<style scoped>
  #cart-list-item{
    display: flex;
    background-color: #fff;
    padding-top: 5px;
  }

  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
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
    margin-bottom: 25px;

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
</style>