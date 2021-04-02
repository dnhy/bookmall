import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail=()=>import('views/detail/Detail.vue')
const ConfirmIndent=()=>import('views/indent/ConfirmIndent.vue')
const IndentAll=()=>import('views/indentAll/IndentAll.vue')
const Login=()=>import('views/login/Login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/user',
    component:Profile
  },
  {
    path: '/detail/:book_id',
    component:Detail
  },
  {
    path: '/cfindent',
    component:ConfirmIndent
  },
  {
    path: '/indentall/:type_id',
    component:IndentAll
  },
  {
    path: '/login',
    component:Login
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
