<template>
    <div>
        <van-nav-bar
            title="我的订单"
        />

      <van-tabs @click="onClick">
        <van-tab v-for="(value) in orderType" :key="value.id" :title="value.name">
            <van-panel v-for="(value) in orderList" :key="value.id" title="订单编号" :desc="String(value.id)" :status="value.status" >
                <van-card v-for="(order) in value.orderLines" :key='order.id'
                :num="order.number"
                :price="order.price"
                :title="order.product.name"
                :thumb="order.product.photo">

                

                <template #footer>      
                    <van-row style="margin:10px 0">
                            <van-col offset="16" span="4">总价</van-col>
                            <van-col span="4">¥{{value.total}}</van-col>
                    </van-row>        
                    
                    <van-button size="mini" v-if="orderStatus==='待支付'">付款</van-button>
                    <van-button size="mini" v-if="orderStatus==='待确认'">确认订单</van-button>
                    <van-button size="mini">详情</van-button>
                </template>
                </van-card>
            </van-panel>



        </van-tab>
     </van-tabs>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    data() {
        return {
            orderStatus:'',
            userId:'',
            orderList:[],
            orderType:[
                {
                id:0,
                name:'全部'
                },
                {
                id:1,
                name:'待支付'
                },
                {
                id:2,
                name:'待派单'
                },
                {
                id:3,
                name:'待接单'
                },
                {
                id:4,
                name:'待服务'
                },{
                id:5,
                name:'待确认'
                },{
                id:6,
                name:'已完成'
                }  
            ]

            
        }
    },
    components:{

    },
    created() {
        this.userId=localStorage.getItem('userId')
    },

    methods: {
        ...mapActions('order',['loadOrder']),
        
         onClick(name, title) {
             this.orderStatus=title
             let obj={
                customerId:this.userId,
                }
             if(title==='全部'){   
                 this.loadOrder(obj).then(r=>{
                    this.orderList=r.data
                    console.log("orderList",this.orderList);
                })
             }else{
                 obj.status=title
                 this.loadOrder(obj).then(r=>{
                     this.orderList=r.data
                     console.log('orderList',this.orderList);
                 })
             }
            
                

                 status:title

    },
    },
}
</script>