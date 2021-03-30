<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calculate">
      结算({{checkLength}})
    </div>
  </div>

</template>

<script>
import CheckButton from "@/components/contents/checkButton/CheckButton";
import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
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
    selectAll(){
      if (this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }else{
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    calculate(){
      if (!this.cartList.filter((item)=>item.checked).length){
        this.$toast.show('至少选择一件商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #fff;
    position: fixed;
    bottom: 49px;
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