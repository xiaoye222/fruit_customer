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
import Comment from '../views/manager/user/comment.vue'
import Details from '../views/manager/details.vue'
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
                path: 'details',
                component: Details
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
   
    {
        path: '/order/confirm',
        component: OrderConfirm
    },
   

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router