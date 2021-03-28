import {request} from "@/network/request";
import it from "element-ui/src/locale/lang/it";

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
    this.userName=bookInfo.userName
    this.servName=bookInfo.servName
    this.price=bookInfo.price
    this.restAmount=bookInfo.restAmount
    this.publisher=bookInfo.publisher
    this.publishTime=bookInfo.publishTime.split(" ")[0]
    this.uptime=bookInfo.uptime.split(" ")[0]
    this.condition=bookInfo.conditionName
    this.userAddress=bookInfo.userAddress
    this.author=bookInfo.author
  }
}