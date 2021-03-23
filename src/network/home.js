//封装首页的请求
import {request} from "request";

export function getHomeMultidata(){
  //返回promise
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(){

}

export function getBookTest(){
  return request({
    url:'/book/findById'
  })
}
