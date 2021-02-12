import {get, post } from '@/http/axios'
export default {
    namespaced: true,
    state: {
        allOrder: [],
        waitPay: [],
        waitSend: [],
        waitTake: [],
        waitServe: [],
        waitConfirm: [],
        completeOrder: [],
        orderDetail: {}
    },
    getters: {},
    mutations: {
        setAllOrder(state, data) {
            state.allOrder = data
        },
        setWaitPayOrder(state, data) {
            state.waitPay = data
        },
        setWaitSendOrder(state, data) {
            state.waitSend = data
        },
        setWaitTakeOrder(state, data) {
            state.waitTake = data
        },
        setWaitServeOrder(state, data) {
            state.waitServe = data
        },
        setWaitConfirmOrder(state, data) {
            state.waitConfirm = data
        },
        setCompleteOrder(state, data) {
            state.completeOrder = data
        },
        setOrderDetail(state, data) {
            state.orderDetail = data
        },


    },
    actions: {
        // 加载所有订单
        async loadOrder(context, params) {
            let res = await get('/order/query', params)
            // console.log(params);
            if (!params.status) {
                context.commit('setAllOrder', res.data.list)
            } else if (params.status === '待支付') {
                context.commit('setWaitPayOrder', res.data.list)
            } else if (params.status === '待派单') {
                context.commit('setWaitSendOrder', res.data.list)
            } else if (params.status === '待接单') {
                context.commit('setWaitTakeOrder', res.data.list)
            } else if (params.status === '待服务') {
                context.commit('setWaitServeOrder', res.data.list)
            } else if (params.status === '待确认') {
                context.commit('setWaitConfirmOrder', res.data.list)
            } else if (params.status === '已完成') {
                context.commit('setCompleteOrder', res.data.list)
            }
            return res
        },

        // 查看订单详情
        async loadOrderDetailById(context, data) {
            console.log('查看订单详情',data);
            let res = await get("/order/findById", data)
            context.commit('setOrderDetail', res.data)
            return res
        },

        // 支付订单
        async payOrder(context,data){
            console.log("执行力吗？");
            let res=await get("/order/paymoney",data)
            console.log("支付订单",res)
            console.log("执行了呀");
            return res

            
        }

    }
}