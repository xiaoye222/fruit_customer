<template>
    <div>
      <van-nav-bar
        title="我的评论"
        left-text="返回"
        left-arrow
        @click-left="goBack"/>



        <div class="box_style" v-for="(item) in AllComments" :key="item.id">
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

            <van-row type="flex" justify="end" class="margin_tb">
                    <van-col span="3" ><van-button size="mini" @click="deleteById(item.id)">删除</van-button></van-col>
                    <van-col span="6" ><van-button size="mini" @click="toDetail(item.orderId)">订单详情</van-button></van-col>
            </van-row>
        </div>




    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {            
            userId:'',
        }
    },

    computed:{
        ...mapState('order',['orderDetail']),
        ...mapState('comment',['AllComments'])
    },

    created() {        
        this.userId=localStorage.getItem('userId')
        this.loadComment()
    },
    methods: {
        ...mapActions('order',['loadOrder','loadOrderDetailById']),
        ...mapActions('comment',['findAllCommentsByCusId','delCommentById']),
        // 返回
        goBack(){
            this.$router.go(-1)
        },

        // 删除
        deleteById(id){
            this.delCommentById({id:id}).then(r=>{
                this.loadComment()
            })
        },

        // 
        toDetail(oid){
            this.loadOrderDetailById({id:oid}).then(r=>{

                this.$router.push({path:'/order/details',query:{orderDetail:this.orderDetail}})
                
            })
        },

        loadComment(){
            this.findAllCommentsByCusId(this.userId)
        },
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