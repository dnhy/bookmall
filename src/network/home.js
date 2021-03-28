//封装首页的请求
import {request} from "@/network/request";
import axios from "axios";

// export function getHomeMultidata(){
//   //返回promise
//   return request({
//     url:'/home/multidata'
//   })
// }
//
// export function getHomeGoods(){
//
// }

export function getBookAll(){
  return request({
    url:'/book/findAll'
  })
}

export function getBookByPage(page){
  return request({
    url:'/book/data',
    params:{
      page:page
    }
  })
}

export function getBookTypePage(type,page){
  return request({
    url:'/book/data2',
    params:{
      type:type,
      page:page
    }
  })
}

export function getHomeMultidata(){
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000
  })
  const config={
    url:'/home/multidata'
  }
  return instance(config)
}
