<template>
  <div id="base-info">
    <div class="title">{{books.bookName}}</div>
    <div class="info-primary">
      <div class="base">
<!--        <span class="title">{{books.bookName}}</span>-->
        <span class="price">￥{{books.price}}</span>
        <span class="service">{{books.servName}}</span>
        <el-button size="mini" class="conditon-desc">{{books.condition}}</el-button>
      </div>
      <div class="info-service">
        <span><img ref="colimg" src="~assets/img/common/collect.svg" alt="">收藏</span>
        <span>{{books.userAddress}}</span>
        <span>库存{{books.restAmount}}件</span>
      </div>
    </div>
    <div class="info-param">
      <table class="param-table">
        <tr><th>作者</th><td><span>{{books.author}}</span></td></tr>
        <tr><th>出版社</th><td>{{books.publisher}}</td></tr>
        <tr><th>出版时间</th><td>{{books.publishTime}}</td></tr>
        <tr><th>上书时间</th><td>{{books.uptime}}</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

export default {
  name: "DetailBaseInfo",
  data(){
    return{
      // authorList:this.props.books
    }
  },
  props:{
    books: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    authorMearge(){
      // let author=''
      // const bookAuthor=this.books.bookAuthor
      // if (bookAuthor === undefined)
      //   return ''
      // for(let i=0,len=bookAuthor.length;i<len;i++){
      //   i+1 < bookAuthor.length ? author+=bookAuthor[i]+'、':author+=bookAuthor[i]+' 著'
      // // }
      // return author
    }
  }
}
</script>

<style scoped>
#base-info{
  box-shadow: 0 1px 1px rgba(100,100,100,0.1);
}
.info-primary{
  display: flex;
}

.info-param{
  box-shadow: 0 10px 1px rgba(100,100,100,0.1);
}

.base{
  flex: 3;
}

.base span{
  display: block;
  margin: 5px 0 10px 10px ;
  line-height: 30px;
  vertical-align: middle;
}

.title{
  padding:0 10px;
  margin-top: 30px;
  display: -webkit-box;
  -webkit-line-clamp:2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.base .price{
  color: var(--color-tint);
  font-weight: bold;
  font-size: 20px;
}

.base .conditon-desc{
  margin-left: 13px;
}

.info-service{
  flex: 1;
}

.info-service span{
  height: 30px;
  display: block;
  text-align: right;
  margin: 5px 10px 10px 0 ;
  line-height: 30px;
  vertical-align: middle;
}

.info-service span:nth-last-of-type(-n+2){
  color: var(--color-hint-text);
}

.info-service img{
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  vertical-align: middle;
}

.param-table{
  line-height: 30px;
  margin-left: 10px;
}

.param-table th{
  color: var(--color-hint-text);
  font-weight: lighter;
  text-align: left;
}

.param-table td{
  padding-left: 10px;
}
</style>