import {request} from "@/network/request";
import {formatDate} from "@/common/utils";

export function showCartSE(userId){
  return request({
    method:'get',
    url:'/user/showcart',
    params:{
      userId
    }
  })
}

export function deleteCartDT(userId,bookId){
  return request({
    method:'get',
    url:'/user/deletecart',
    params:{
      userId,
      bookId
    }
  })
}

export function addCartIn(cart){
  return request({
    method:'post',
    url:'/user/addcart',
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    data:{
      bookId:cart.bookId,
      userId:cart.userId,
      bookCount:cart.bookCount,
      addTime:cart.addTime
    }
  })
}

export function modifyCartUp(cart){
  return request({
    method:'post',
    url:'/user/updatecart',
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    data:{
      bookId:cart.bookId,
      userId:cart.userId,
      bookCount:cart.bookCount,
      addTime:cart.addTime
    }
  })
}

export class Cart{
  constructor(payload) {
    this.bookId=payload.id
    this.userId=1
    this.bookCount=payload.count
    let data=new Date()
    this.addTime=formatDate(data)
  }
}