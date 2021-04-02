<template>
  <div class="indent">
    <div class="ident-title">
      <div class="title">我的订单</div>
      <div class="more" @click="$router.push('/indentall/0')">
        查看全部 >
      </div>
    </div>
    <div class="ident-bar">
      <div class="ident-item" @click="showIndent(1)">
        <img src="~assets/img/profile/pay.svg" alt="">
        <div class="ident-category">
          待付款
        </div>
      </div>
      <div class="ident-item" @click="showIndent(2)">
        <img src="~assets/img/profile/send.svg" alt="">
        <div class="ident-category">
          待发货
        </div>
      </div>
      <div class="ident-item" @click="showIndent(3)">
        <img src="~assets/img/profile/receive.svg" alt="">
        <div class="ident-category">
          待收货
        </div>
      </div>
      <div class="ident-item" @click="showIndent(4)">
        <img src="~assets/img/profile/complete.svg" alt="">
        <div class="ident-category">
          已完成
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileRecord",
  methods:{
    showIndent(typeId){
      this.$router.push('/indentall/'+typeId)
    }
  }
}
</script>

<style scoped>
  .indent{
    background-color: #fff;
    padding: 10px 0;
    margin: 5px 5px 0 5px;
    border-radius: 10px;

  }
  .ident-title{
    display: flex;
    padding: 5px 0 15px 0;
    border-bottom: 1px solid #dedcdc;
  }
  .title{
    flex: 1;
    padding-left: 10px;
  }
  .more{
    display: inline-block;
    padding-right: 10px;
    color: var(--color-hint-text);
  }
  .ident-bar{
    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px 0;
  }
  .ident-item{
    flex: 1;
  }
  .ident-item img{
    width: 20px;
    margin: 5px 0;
  }
</style>