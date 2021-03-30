import Toast from "@/components/common/Toast/Toast";

const obj={}

obj.install = function (Vue){
  //vue对象创建时会把js挂载到el指示的css上，再把有了js的css放到el中，形成挂载完成的节点属性
  // console.log('Toast.el:'+Toast.el);
  //1.创建组件构造器
  const toastContrustor=Vue.extend(Toast)
  //2.new的方式根据组件构造器创建一个组件对象
  const toast=new toastContrustor()
  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.挂载完成的toast.$el添加到body中
  document.body.appendChild(toast.$el)

  //5.把toast对象添加到Vue的原型中
  Vue.prototype.$toast=toast
}

export default obj