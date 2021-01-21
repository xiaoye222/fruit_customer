<template>
    <div class="details">
        <van-nav-bar
            title="商品列表"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />
            <van-row>
                <van-col span="5">
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item @click="test({id:item.id,isTrue:false})" v-for="item in category" :key='item.id' :title="item.name" />
                    </van-sidebar>
                </van-col>
                <van-col span="19">
                
                    <van-card v-for='item in newArr' :key='item.id'
                    :price="item.price"
                    :desc="item.description"
                    :title="item.name"
                    :thumb="item.photo">

                    <template #footer>
                        <van-stepper v-model="item.num" default-value=0 @change="updateCart(item.id,item.num)"  min="0" />    
                    </template>

                    </van-card>
                </van-col> 
            </van-row>
            <van-row>
            <van-submit-bar  :price="totalPrice *100" button-text="提交订单" @submit="onSubmit" />
            </van-row>
            
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return {
            activeKey:0,
            newArr:[],
        }
    },
     
    computed:{
        ...mapState('shouye',['category','product']),
        ...mapGetters('order', {
            cartProducts: 'cartProducts', // 购物车的商品
            totalPrice: 'cartTotalPrice' // 购物车商品的总价格
    })
    },
    created(){
        this.activeKey = this.$route.query.index
        this.load()
    },
    methods:{
        ...mapActions('shouye',['loadCategory','loadProduct']),
        ...mapActions('order',['addProductToCart']),
        test(obj){
            let oid
            if(obj.isTrue){
                oid = this.$route.query.oid
            }else{
                oid = obj.id
            }
             this.newArr = this.product.filter((item)=>{
                return item.categoryId == oid
            })
        },
        load(){
            this.loadCategory()
            this.loadProduct().then(r=>{
                
                if(this.$route.query.test){
                    this.newArr = this.product
                }else{
                    this.test({isTrue:true})
                }
            })
        },
        goBack(){
            this.$router.go(-1)
        },

        // 更新购物车里的数据
        updateCart(id,number){
            this.addProductToCart({id,number})
        },

        onSubmit(){
            console.log(this.$route.query,"￥route");
            console.log("提交订单");
            console.log(localStorage.getItem('userId'))
            this.$router.push({path:'/order/confirm'})
        }

    }
}
</script>