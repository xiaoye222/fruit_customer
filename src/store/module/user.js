import { post_json, get, post } from '@/http/axios'
export default {
    namespaced: true,
    state: {
        customerDetails: {},
        orderInfo: [],
        addressInfo: []
    },
    getters:{
        addressList:(state,getters)=>{
            return state.addressInfo.map((item)=>{
                return {
                    id:item.id,
                    province:item.province,
                    city:item.city,
                    area:item.area,
                    address:item.province+item.city+item.area+item.address,
                    tel:item.telephone,
                    name:this.username,
                    // isDefault:false
                }
            })

        }
    },
    mutations: {
        changeDetails(state, data) {
            state.customerDetails = data
        },
        loadOrderByCustomerId(state, data) {
            state.orderInfo = data
        },
        loadAddressByCustomerId(state, data) {
            state.addressInfo = data
        }
    },
    actions: {

        //根据id查找顾客详情
        async loadCustomerById(context, data) {
            let res = await get('/customer/findCustomerById', data)
            console.log("根据id查询到的顾客详情是---------");
            console.log(res);
            context.commit('changeDetails', res.data)
            return res
        },

        //根据顾客id查询顾客相关订单信息
        async findOrderByCustomerId(context, data) {
            let res = await post('/order/queryPage', data)
            console.log("根据顾客id查询相关订单信息是---------");
            console.log(res);
            context.commit('loadOrderByCustomerId', res.data.list)
            return res
        },
        // /address/findByCustomerId
        // 根据顾客id查询顾客地址信息
        async findAddressByCustomerId(context, data) {
            let res = await get('/address/findByCustomerId', data)
                // console.log("地址信息", res.data);
            context.commit('loadAddressByCustomerId', res.data)
            return res
        },

        // 顾客新增或编辑地址
        async addressAddOrEdit(context, data) {
            let res = await post("/address/saveOrUpdate", data)
            return res
        },

        // 顾客删除地址信息
        async deleteAddress(context, data) {
            let res = await get("/address/deleteById", data)
            return res
        }




    }
}