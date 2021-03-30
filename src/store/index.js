import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(Vuex)

const state={
  cartList:[]
}
export default new Vuex.Store({
  //action->mutaiton->state
  state,
  //mutations的目的就是修改state，其中的每一个方法尽肯能完成的事件比较单一
  mutations,
  //actions分发不同的事件到mutations中
  actions,
  getters
})
