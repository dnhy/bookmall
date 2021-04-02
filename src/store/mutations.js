import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

import {addCartIn,modifyCartUp,showCartSE,deleteCartDT, Cart} from "@/network/cart";

export default {
  add_user(state,payload){
    state.user=payload
    console.log(state.user);
  },
  delete_user(state){
    state.user={}
  },
  add_indent_show(state,payload){
    //展示
    state.indentList=payload
  },
  delete_cart_list(state,payload){
    state.cartList=[]
  },
  delete_cart(state,payload){
    // console.log(payload);
    state.cartList.splice(payload.index,1)
    //数据库操作Delete
    deleteCartDT(payload.uId,payload.id)
  },

  delete_cart_checked(state){
    const checkedList=state.cartList.filter((item)=>item.checked)
    const unCheckedList=state.cartList.filter((item)=>item.checked === false)
    state.cartList.length=0
    console.log(state.cartList);
    state.cartList=unCheckedList
    console.log(state.cartList);
    for(let item of checkedList) {
      deleteCartDT(item.uId, item.id)
    }
  },

  [ADD_COUNTER](state,payload){
    payload.count++
    //数据库操作Update
    let cart=new Cart(payload)
    modifyCartUp(cart)
  },

  [ADD_TO_CART](state,payload){
    payload.checked=false
    state.cartList.push(payload)
    //数据库操作Insert
    let cart=new Cart(payload)
    console.log(payload);
    addCartIn(cart)
  }
}