<template>
    <div class="money">
            <van-nav-bar
            title="账户余额"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />

<div class="content">
      <div>
        <van-icon name="gold-coin" color="orange" size="45" />    
      </div>
        <div>我的零钱</div>
        <div class='moneynum'>
        ￥{{customerDetails.money}}
        </div>

        <div>
            <van-button type="primary" block>充值</van-button>
           
        </div>
        <div>
             <van-button block>提现</van-button>
        </div>


</div>

      
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data(){
        return {
            userId:''
        }
    },
    created() {
        this.load()
    },
    computed:{
        ...mapState('user',['customerDetails'])
    },
    methods:{
        ...mapActions('user',['loadCustomerById']),
        // 加载用户相关信息
        load(){
            this.userId = localStorage.getItem('userId')
            this.loadCustomerById({id:this.userId})
        },

        // 返回
        goBack(){
            this.$router.go(-1)
        },

      }

}
</script>

<style lang='scss' scoped>
    .content{
        padding: 10px 0;
        div{
            display: flex;
            justify-content: center;
            margin: 20px auto;
            // border: 1px solid sandybrown;
        }
        .van-button__content{
            margin: 0 auto;
        }
        div:nth-child(3) ~div{
            width: 80%;
        }
        .moneynum{
        font-size: 25px;
        }
    }
</style>