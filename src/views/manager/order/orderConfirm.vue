<template>
    <div class="orderConfirm">
        <van-nav-bar
            title="订单确认"
            left-text="取消"
            left-arrow
            @click-left="goBack"
            />


        <div class="divider">收件地址</div>
        <van-row type="flex" justify="center" align="center">
            <van-col style="border:1px solid balck" span="20">
                <van-field left-icon="smile-o" v-model="selectedAddress.name" label="收件人" readonly/>
                <van-field left-icon="send-gift-o" v-model="selectedAddress.address" label="详细地址" readonly type="textarea" autosize/>
                <van-field left-icon="phone-o" v-model="selectedAddress.tel" type="tel" label="手机号" readonly/>
            </van-col>

            <van-col span="4">
                <van-button style="border:0px" icon="arrow" to="/home/user/address"/>
            </van-col>
        </van-row>

            
        <div class="divider">订单物品</div>

        <van-row>
            <van-card v-for='item in cartProducts' :key='item.productId'
            :price="item.price"
            :thumb="item.photo"
            :desc="item.description"
            :title="item.productName">
            <template #footer>
                <van-stepper  v-model="item.number" default-value=0 @change="updateCart(item.productId,item.number)"  min="0" />    
            </template>
            </van-card> 
        </van-row>
    
        <van-row class="margin_top">
            <van-submit-bar  :price="totalPrice *100" button-text="提交订单"    @submit="onSubmit" />
        </van-row>


    
            
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'

export default {
    data() {
        return {
            list:[],
            userId:''
        }
    },
    created() {
        this.list.push(this.selectedAddress)
        this.userId = localStorage.getItem('userId')
    },
    computed:{
        ...mapState('user',['defaultAddressId']),
        ...mapGetters('cartOrder', {
            cartProducts: 'cartProducts', // 购物车的商品
            totalPrice: 'cartTotalPrice' // 购物车商品的总价格
        }),
        ...mapGetters('user', {
            selectedAddress:'selectedAddress'
        })
    },

    

    methods:{
        ...mapActions('cartOrder',['addProductToCart','saveOrder']),

        goBack(){
                this.$router.push({path:'/home/order'}) 
        },

        // 更新购物车里的数据
        updateCart(id,number){
            // console.log(id,number,"更新购物车的数据");
            // if(number==0){
            //     console.log("变为0了");
            // }
            this.addProductToCart({id,number})
        },

        onSubmit(){
            // console.log(this.cartProducts,"提交订单");
            // console.log(this.selectedAddress,"提交订单");
            let orderLines=this.cartProducts.map((item)=>{
                return {
                    productId:item.productId,
                    productName:item.productName,
                    price:item.price,
                    number:item.number,
                }
            })
            this.saveOrder({
                customerId:this.userId,
                addressId:this.selectedAddress.id,
                orderLines
            }).then(r=>{
                this.$store.state.cartOrder.items=[]
                // 将购物车订单内容清空
                this.$router.push({path:'/home/order'})
                // console.log("清空之后----------",this.$store.state.cartOrder.items,"");

            })

        }
    }
    
}
</script>

 <style lang='scss' scoped>
        .margin_top{
            margin-top: 50px;
        }

        .orderConfirm{
            .divider{
                margin: 16px 0;
                color: #969799;
                font-size: 14px;
                line-height: 24px;
                text-indent:0.5rem;
        }
    }
</style>