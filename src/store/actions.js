import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context,payload){
    // let oldProduct=null
    // for(let item of state.cartList){
    //   if (item.id === payload.id){
    //     oldProduct=item
    //   }
    // }
    return new Promise((resolve,reject)=>{
      let product=context.state.cartList.find(function (item){
        return item.id === payload.id
      })
      if (product){
        // product.count += 1
        context.commit(ADD_COUNTER,product)
        resolve("商品数量+1")
      } else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve("添加商品到购物车")
      }
    })
  }
}