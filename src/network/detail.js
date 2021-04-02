import {request} from "@/network/request";
import {formatDate} from "@/common/utils";
import Vue from 'vue'

export function getDetail(id){
  return request({
    url:'/book/findById',
    params:{
      id
    }
  })
}

export class myBooks{
  constructor(bookInfo){
    this.bookId=bookInfo.bookId
    this.bookName=bookInfo.bookName
    this.coverImage=bookInfo.coverImg
    this.introImage=bookInfo.introImg
    this.introduction=bookInfo.introduction
    this.seller=bookInfo.seller
    this.servName=bookInfo.servName
    this.price=bookInfo.price
    this.restAmount=bookInfo.restAmount
    this.publisher=bookInfo.publisher
    this.publishTime=bookInfo.publishTime.split(" ")[0]
    this.uptime=bookInfo.uptime.split(" ")[0]
    this.condition=bookInfo.conditionName
    this.userAddress=bookInfo.userAddress
    this.author=bookInfo.author
    this.servicePrice=bookInfo.servicePrice
    this.seller=bookInfo.seller
  }
}

