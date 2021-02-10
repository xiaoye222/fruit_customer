import Vue from 'vue'
import Vuex from 'vuex'
import login from './module/login'
import shouye from './module/shouye'
import user from './module/user'
import cartOrder from './module/cartOrder'
import order from './module/order'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        shouye,
        user,
        cartOrder,
        order
    }
})