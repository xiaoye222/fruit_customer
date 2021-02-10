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
            userId:''
        }
    },
     
    computed:{
        ...mapState('shouye',['category','product']),
        ...mapGetters('cartOrder', {
            cartProducts: 'cartProducts', // 购物车的商品
            totalPrice: 'cartTotalPrice' // 购物车商品的总价格
        }),
        ...mapGetters('user', {
            addressList:'addressList'
    })
        

    },
    created(){
        this.activeKey = this.$route.query.index
        this.userId=localStorage.getItem('userId')
        this.load()
    },
    methods:{
        ...mapActions('shouye',['loadCategory','loadProduct']),
        ...mapActions('cartOrder',['addProductToCart']),
        ...mapActions('user',['findAddressByCustomerId']),
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
            // console.log(this.$route.query,"$route.query");
            // console.log("提交订单",this.addressList);     

            // 确认订单页面需要地址信息，如果未曾访问地址页，地址列表为空
            // 判断地址列表为空，就去发送请求获得地址信息
            if(this.addressList.length==0){
               this.findAddressByCustomerId({id:this.userId}).then(r=>{
               this.chosenAddressId=this.$store.state.user.defaultAddressId
            })}
            this.$router.push({path:'/order/confirm'})
        }

    }
}
</script>