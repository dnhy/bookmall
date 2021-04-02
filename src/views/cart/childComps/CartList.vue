<template>
  <div id="cart-list">
    <scroll class="content" ref="scroll" :pullUpLoad="true">
      <cart-list-item class="cart-list-item" v-for="(item,index) in cartList" :key="item.value" :cart-list-item="item" :index="index"/>
      <empty v-show="isShow"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
import Empty from "@/components/common/empty/Empty";
import {mapActions, mapGetters} from 'vuex'
import {showCartSE} from "@/network/cart";

export default {
  name: "CartList",
  data(){
    return{
      isShow:true,
      myCartList:[]
    }
  },
  components:{
    Empty,
    Scroll,
    CartListItem,
  },
  computed:{
    ...mapGetters(['cartList','user'])
  },
  methods:{
    ...mapActions(['deleteCartList']),
    debounce(func ,delay){
      let timer=null
      return function (...args){
        if (timer) clearTimeout(timer)
        timer=setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
  },
  mounted() {
    const refresh=this.debounce(this.$refs.scroll.refresh)
    this.$bus.$on('castItemLoad',()=>{
      refresh()
    })
    //$el获取组建中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  created() {
    const myProduct={}
    myProduct.uId=this.user.userId
    if (myProduct.uId!==0) {
      showCartSE(myProduct.uId).then(res=>{
        for(let item of res) {
          //对请求到的数据作转换处理
          const product={}
          product.image=item.coverImg
          product.title=item.bookName
          product.cond=item.conditionName
          product.price=item.price
          product.count=item.bookCount
          product.uId=item.userId
          product.checked=false
          product.id=item.bookId
          //清空cartList
          // this.deleteCartList()

          // console.log(this.cartList);
          // for (let i=0;i<this.cartList;i++){
          //   this.cartList[i]=product
          // }
          //不用push
          this.cartList.push(product)
        }
        this.isShow = this.cartList.length === 0;
      })
    }
  },
  activated() {
    //解决empty图的不消失问题：再次进入页面时重载数据
    const myProduct={}
    myProduct.uId=this.user.userId
    if (myProduct.uId!==0) {
      showCartSE(myProduct.uId).then(res=>{
        for(let item of res) {
          //对请求到的数据作转换处理
          const product={}
          product.image=item.coverImg
          product.title=item.bookName
          product.cond=item.conditionName
          product.price=item.price
          product.count=item.bookCount
          product.uId=item.userId
          product.checked=false
          product.id=item.bookId
          //清空cartList
          // this.deleteCartList()

          console.log(this.cartList);
          for (let i=0;i<this.cartList;i++){
            this.cartList[i]=product
          }
          //不用push
          // this.cartList.push(product)
        }
        //控制
        this.isShow = this.cartList.length === 0;
      })
    }

    this.$refs.scroll.refresh()
  },
  deactivated() {

  }
}
</script>

<style scoped>
  #cart-list{
    /*视口高度减上下导航栏，就是list高度*/
    height: calc(100vh - 44px - 49px - 40px);
    background-color: #efefef;
    margin-top: 5px;

  }
  .content{
    /*滚动的内容高度应该与list等高*/
    height: 100%;
    overflow: hidden;
  }
  .cart-list-item{
  }
</style>