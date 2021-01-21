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
    actions: {
        async loadProduct(context, data) {
            let res = await get('/product/findAll')
            context.commit('changeProduct', res.data)
            console.log(res, 'loadProduct========')
            return res
        },
        async loadCategory(context, data) {
            let res = await get('/category/findAll')
                // console.log(res.data)
            context.commit('changeCategory', res.data)
            return res
        },

    }
}