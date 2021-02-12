import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import User from '../views/manager/user.vue'
import Order from '../views/manager/order/index.vue'
import Shouye from '../views/manager/shouye.vue'
import Money from '../views/manager/user/money.vue'
import Address from '../views/manager/user/address.vue'
import AddressAdd from '../views/manager/user/addressAdd.vue'
import AddressEdit from '../views/manager/user/addressEdit.vue'
import OrderConfirm from '../views/manager/order/orderConfirm.vue'
import OrderDetail from '../views/manager/order/orderDetail.vue'
import Comment from '../views/manager/user/comment.vue'
import ProductList from '../views/manager/productList.vue'
import ProductDetail from '../views/manager/product/detail.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
                path: 'shouye',
                component: Shouye
            }, 
            {
                path: 'order',
                component: Order,
            },
            {
                path: 'user',
                component: User,
            },
            {
                path: 'user/address',
                component: Address
            },
            {
                path: 'user/address/add',
                component: AddressAdd
            },
            {
                path: 'user/address/edit',
                component: AddressEdit
            },
            {
                path: 'user/money',
                component: Money
            },
            {
                path: 'productList',
                component: ProductList
            },
            {
                path: 'productDetail',
                component: ProductDetail
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
   
    {
      path:'/comment',
      component:Comment
    },
    {
        path: '/order/confirm',
        component: OrderConfirm
    },
    {
        path: '/order/details',
        component: OrderDetail,
    },
   

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router