<template>
    <div>
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"/>

        <div class="box_style">
            <van-row v-for="(item) in orderDetail.orderLines" :key="item.id">
                <van-col span="5">物品名称</van-col>
                <van-col span="10" offset="2">{{item.product.name}}</van-col>
                <van-col span="2" offset="2">× {{item.number}}</van-col>
            </van-row>
            <van-row>
                <van-col span="5">总价</van-col>
                <van-col span="10" offset="2">¥{{orderDetail.total}}</van-col>
            </van-row>
            <van-row>
                <van-col span="5">订单时间</van-col>
                <van-col span="17" offset="2">{{orderDetail.orderTime | dateParse}}</van-col>
            </van-row>
            <van-row>
                <van-col span="5">收货地址</van-col>
                <van-col span="17" offset="2">{{orderDetail.address.province}}{{orderDetail.address.city}}{{orderDetail.address.area}}{{orderDetail.address.address}}</van-col>
            </van-row>
        </div>

    <div class="my_comments">
            <van-row>
                <van-col span="6">我的评价:</van-col>
                <van-col span="4" offset="14">
                    <van-button is-link @click='changeShow' type="warning" size="small" plain hairline>评价</van-button>
                </van-col>
            </van-row>
    </div>

        <div class="box_style" v-for="(item) in commentByOidAndCid" :key="item.id">
            <van-row >
                <van-col span="5">订单编号</van-col>
                <van-col span="10" offset="2">{{item.orderId}}</van-col>
            </van-row>
            <van-row>
                <van-col span="5">评论内容</van-col>
                <van-col span="10" offset="2">{{item.content}}</van-col>
            </van-row>
            <van-row>
                <van-col span="5">评论时间</van-col>
                <van-col span="17" offset="2">{{item.commentTime | dateParse}}</van-col>
            </van-row>
        </div>


        <van-dialog v-model="show" title="我的评论" show-cancel-button :beforeClose="beforeClose">
            <van-row>
                 <van-field label="顾客编号" :value="userId" readonly />
            </van-row>
            <van-row>
                <van-field label="订单编号" :value="orderDetail.id" readonly />
            </van-row>
            <van-row>
                <van-field
                    v-model="comment"
                    rows="4"
                    autosize
                    label="评论内容"
                    type="textarea"
                    maxlength="200"
                    placeholder="请输入评论"
                    show-word-limit/>
            </van-row>
        </van-dialog>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            orderDetail:{},
            show: false,
            userId:'',
            comment:''
        }
    },

    computed:{
        ...mapState('comment',['commentByOidAndCid'])
    },

    created() {        
        this.orderDetail = this.$route.query.orderDetail
        this.userId=localStorage.getItem('userId')
        this.loadComment()
    },
    methods: {
        ...mapActions('comment',['findCommentsByOrderId','saveComment']),

        // 返回
        goBack(){
            this.$router.go(-1)
        },

        // 评论
        changeShow(){
            this.show=true
        },

        loadComment(){
            this.findCommentsByOrderId({
                        page:0,
                        pageSize:100,
                        cusId:this.userId,
                        orderid:this.orderDetail.id
            })
        },


        // 
        beforeClose(event,so){
            // console.log('e',event);
            // console.log('so',so);
            if(event==='confirm'){
                let obj={
                cusId:this.userId,
                orderId:this.orderDetail.id,
                content:this.comment,}
                this.saveComment(obj).then(r=>{
                    // console.log("评论结果",r);
                   this.loadComment()

                })
            }
            so()
           

        }


        



    },
}
</script>


<style scoped>
.box_style{
    margin: 1em 1em;
    padding: .5em;
    border-radius: 5px;
    line-height: 1.8em;
    background: #f1f1f1;
}


.my_comments{
    margin: 1em 1em;
    padding: .4em;
    border-radius: 5px;
    line-height: 1.8em;
}

</style>