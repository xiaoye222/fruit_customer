import { post_json, get, post } from '@/http/axios'
import { iteratee } from 'lodash'
export default {
    namespaced: true,
    state: {
        // 已加入购物车的商品，格式如 [{ id, number }, { id, number }]
        // 注意，购物车只存储 id 和数量，其他商品信息不存储
        items:[]
    },
    mutations: {
    
    // 首次添加物品到购物车里
        pushProductToCart (state, { id }) {
        // console.log(id,"首次添加物品到购物车里");
        state.items.push({
            id,
            number: 1
        })
    },

    // 商品再次被添加到购物车，修改商品数量
        updateItemNumber (state, { id,number }) {
        // console.log(id,number,"再次添加时，修改商品的数据");
        const cartItem = state.items.find(item => item.id === id)
        cartItem.number=number
    },


    },

    getters:{
        cartProducts:(state, getters, rootState)=>{
            return state.items.map(({ id, number }) => {
                // 从商品列表中，根据 id 获取商品信息
                const cart_product = rootState.shouye.product.find(prod => prod.id === id)
                return {
                  productId: cart_product.id,
                  productName: cart_product.name,
                  price:cart_product.price,
                  number:number
                }
            })
        },

        // 所有购物车商品的价格总和
        cartTotalPrice: (state, getters) => {
        // reduce 的经典使用场景，求和
            return getters.cartProducts.reduce((total, product) => {
              return total + product.price * product.number
            }, 0)
        }

    },


    actions: {
    // 添加到购物车
    // 【注意】这里没有异步，为何要用 actions ？？？—— 因为要整合多个 mutation
    //        mutation 是原子，其中不可再进行 commit ！！！
        addProductToCart({ commit, state },product){       
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                // 初次添加到购物车
                commit('pushProductToCart', { id: product.id })
              } else {
                // 修改购物车数量
                commit('updateItemNumber', product)
              }
        },

        async saveOrder(context,data){
            let res = await post('/order/save',data)
            console.log(res, '保存订单结果')
            return res
        }

    }
}