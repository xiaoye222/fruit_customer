import { post_json, get } from '@/http/axios'
export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        changeUser(state, data) {
            state.user = data
        }
    },
    actions: {
        async loginTo(context, data) {
            let res = await post_json('/user/login', data)
                // console.log(res.data.token)
            context.dispatch('getInfo', res.data.token)
            return res
        },
        async getInfo(context, data) {
            let res = await get('/user/info', { token: data })
            context.commit('changeUser', res.data)
            console.log("userinfo", res.data);
            localStorage.setItem('img', res.data.avatar)
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('username', res.data.name)
            return res
        }
    }
}