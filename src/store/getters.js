export default {
  user(state){
    return state.user
  },
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  indentList(state){
    return state.indentList
  }
}