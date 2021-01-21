<template>
    <div>
        <div class="userinfo">
        <van-row type="flex" justify="center">
                       我的
        </van-row>
        <van-row type="flex" justify="center">            
          <van-image
            round
            width="10rem"
            height="10rem"
            :src="img"/>
        </van-row>
        <van-row type="flex" justify="center" >
                       <div class="hello">你好，{{username}}</div>
        </van-row>
        </div>
        <van-cell title="账户余额" icon="balance-o" is-link to="user/money" />
        <van-cell title="常用地址" icon="location-o" is-link to="user/address" />
        <van-cell title="我的评论" icon="comment-o" is-link to="comment" />
        <van-cell title="联系我们" icon="phone-o" is-link to="index" />

    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    data(){
        return {
            img:'',
            username:'',
            userId:''
        }
    },
    created() {    
        this.load()
    },
    computed:{
        ...mapState('login',['user'])
    },
   
    methods:{

        ...mapActions('login',['getInfo']),
        // 加载用户相关信息
        load(){
            this.img = localStorage.getItem('img')
            this.userId = localStorage.getItem('userId')
            this.username = localStorage.getItem('username')
        },

        logOut(){
            this.$router.push({path:'/login'})
        }

    }
}
</script>




<style>
    .userinfo{
        padding: 25px;
    }

    .hello{
        /* border-radius: 2px; */
        /* border: 1px solid #eeeeee; */
    }
</style>