import {request} from "@/network/request";

export function addIdentIn(indent){
  return request({
    method:'post',
    url:'/indent/addindent',
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    data:{
      indentId:indent.indentId,
      userId:indent.userId,
      addressId:indent.addressId,
      bookId:indent.bookId,
      count:indent.count,
      indentTime:indent.indentTime,
      isPay:indent.isPay,
      isSend:indent.isSend,
      isReceive:indent.isReceive,
      isComplete:indent.isComplete
    }
  })
}

// export function addIntentDetailIn(indentDetail){
//   return request({
//     method:'post',
//     url:'/indent/addindentdetail',
//     transformRequest: [function(data) {
//       data = JSON.stringify(data)
//       return data
//     }],
//     data:{
//       indentId:indentDetail.indentId,
//       bookId:indentDetail.bookId,
//       count:indentDetail.count
//     }
//   })
// }
export function updateIndent(indent){
  return request({
    method:'post',
    url:'/indent/modifyindent',
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    data:{
      indentId:indent.indentId,
      userId:indent.userId,
      addressId:indent.addressId,
      indentTime:indent.indentTime,
      isPay:indent.isPay,
      isSend:indent.isSend,
      isReceive:indent.isReceive,
      isComplete:indent.isComplete
    }
  })
}

export function findIndentAll(userId){
  return request({
    method:'get',
    url:'/indent/selectindentall',
    params: {
      userId
    }
  })
}
// export class Indent{
//   constructor(cart) {
//     this.indentId=cart.indentId
//     this.userId=cart.userId
//     this.addressId=cart.addressId
//     this.identTime=cart.identTime
//     this.isPay=cart.isPay
//     this.isSend=cart.isSend
//     this.isReceive=cart.isReceive
//     this.isComplete=cart.isComplete
//     this.price=cart.price
//   }
// }