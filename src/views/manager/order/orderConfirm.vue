<template>
    <div>
         <van-nav-bar
            title="订单确认"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'

export default {

    computed:{
        ...mapState('shouye',['category','product']),
        ...mapGetters('order', {
            cartProducts: 'cartProducts', // 购物车的商品
            totalPrice: 'cartTotalPrice' // 购物车商品的总价格
    })
    },

    methods:{
        goBack(){
            this.$router.go(-1)
        },
    }
    
}
</script>