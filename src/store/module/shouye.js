import { post_json, get, post } from '@/http/axios'
export default {
    namespaced: true,
    state: {
        category: [],
        product: []
    },
    mutations: {
        changeCategory(state, data) {
            state.category = data
        },
        changeProduct(state, data) {
            state.product = data
        }
    },
    getters:{
        secondCategory:(state, getters, rootState)=>{
            return state.category.filter(item=>{
                // 返回不是父级的栏目
                return item.parentId!==null
            })
        }
    },
    actions: {
        async loadProduct(context, data) {
            let res = await get('/product/findAll')
            context.commit('changeProduct', res.data)
            // console.log('loadProduct========',res)
            return res
        },
        async loadCategory(context, data) {
            let res = await get('/category/findAll')
            // console.log("!!!!!!!Category========",res.data)
            context.commit('changeCategory', res.data)
            return res
        },

    }
}