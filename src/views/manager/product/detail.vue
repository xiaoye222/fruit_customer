<template>
    <div class="product_detail">
    <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="goBack"/>
        <van-image
        fit="contain"
        :src="productDetail.photo"/>
    <div class="desc">
        <van-row style="color: #ff5000;font-size: 1.5rem;">
            <van-col span="8" offset="2">¥{{productDetail.price}}</van-col>
        </van-row>
        <van-row style="color: rgb(51, 51, 51);font-size: 1rem;font-weight:700">
            <van-col span="22" offset="2">{{productDetail.name}}</van-col>
        </van-row>
        <van-row style="color: rgb(51, 51, 51);font-size: .8rem;">
            <van-col span="22" offset="2">{{productDetail.description}}</van-col>
        </van-row>

        <van-row>
            <van-col span="8" offset="16">
            <van-stepper v-model="num" default-value=0 @change="updateCart(productDetail.id,num)"  min="0" />    
            </van-col>
        </van-row>


        
    </div>

    <van-row>
            <van-submit-bar  :price="totalPrice *100" button-text="结算订单" @submit="onSubmit" />
    </van-row>

    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    data() {
        return {
            productDetail:'',
            num:'',
            userId:''
        }
    },

    computed:{
        ...mapState('shouye',['category','product']),
        ...mapGetters('shouye', {
            secondCategory: 'secondCategory', //
        }),
        ...mapGetters('cartOrder', {
            cartProducts: 'cartProducts', // 购物车的商品
            totalPrice: 'cartTotalPrice' // 购物车商品的总价格
        }),
        ...mapGetters('user', {addressList:'addressList'}),
    },

    created() {
        this.productDetail =JSON.parse(this.$route.query.product);
        this.num = this.$route.query.num;
        this.userId=localStorage.getItem('userId');
        console.log("详情页返回的是",this.productDetail);
    },
    methods: {
        ...mapActions('cartOrder',['addProductToCart']),
        ...mapActions('user',['findAddressByCustomerId']),
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        
        // 更新购物车里的数据
        updateCart(id,number){
            this.addProductToCart({id,number})
        },

        onSubmit(){
            // console.log(this.$route.query,"$route.query");
            // console.log("提交订单",this.addressList);     

            // 确认订单页面需要地址信息，如果未曾访问地址页，地址列表为空
            // 判断地址列表为空，就去发送请求获得地址信息
            if(this.addressList.length==0){
               this.findAddressByCustomerId({id:this.userId}).then(r=>{
               this.chosenAddressId=this.$store.state.user.defaultAddressId
            })}
            this.$router.push({
                path:'/order/confirm',
                query:{
                    product:this.productDetail,num:this.num}

                })
        }
    },
}
</script>

<style scoped>
    .desc{
        line-height:1.8rem;
    }
</style>