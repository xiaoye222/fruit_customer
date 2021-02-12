import { post, get } from '@/http/axios'
export default {
    namespaced: true,
    state: {
        AllComments: [],
        commentByOidAndCid:[]
    },
    mutations: {
        changeAllComments(state, data) {
            state.AllComments = data
        },
        changeCommentByOidAndCid(state,data){
            state.commentByOidAndCid=data
        }
    },
    actions: {
        

        // 根据顾客id查询该顾客所有评论信息
        async findAllCommentsByCusId(context, data) {
            let res = await get('/comment/findCommentByCus', { cusId: data })
            context.commit('changeAllComments', res.data.list)
            return res
        },

        // 根据顾客id和订单id查找评论
        async findCommentsByOrderId(context, data) {
            let res = await post('/comment/query', data)
            context.commit('changeCommentByOidAndCid', res.data.list)
            return res
        },

        // 顾客编辑评论
        async saveComment(context, data) {
            let res = await post('/comment/saveOrUpdate', data)
            return res
        },

        // 顾客根据评论id删除评论

        async delCommentById(context, data) {
            let res = await get('/comment/deleteById', data)
            return res
        }

    }
}