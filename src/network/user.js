import {request} from "@/network/request";

export function findUser(){
  return request({
    method:'get',
    url:'/user/finduser',
  })
}

export function findAddress(userId){
  return request({
    method:'get',
    url:'/user/findaddress',
    params:{
      userId
    }
  })
}