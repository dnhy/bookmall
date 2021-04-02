import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addUser(context,payload){
    return new Promise((resolve, reject) => {
      context.commit('add_user',payload)
      if (payload!=='')
      resolve('登陆成功！')
      else
        reject('登陆失败！')
    })
  },
  deleteUser(context){
    return new Promise((resolve, reject) => {
      context.commit('delete_user')
      resolve('退出登录成功！')
    })
  },
  addIndentShow(context,payload){
    return new Promise((resolve, reject) => {
      context.commit('add_indent_show',payload)
    })
  },
  deleteCartList(context,payload){
    return new Promise((resolve, reject) => {
      context.commit('delete_cart_list',payload)
    })
  },
  deleteCart(context,payload){
    return new Promise((resolve,reject) => {
      context.commit('delete_cart',payload)
    })
  },
  deleteCartChecked(context){
    return new Promise((resolve,reject)=>{
      context.commit('delete_cart_checked')
    })
  },
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