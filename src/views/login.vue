<template>
    <div class="login">
        <div class="header">
            <div class="header_logo">水</div>
            <div class="header_title">生鲜配送云平台<span>&nbsp;顾客端</span></div>
        </div>
        <div class="content">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    登录
                    </van-button>
                </div>
                </van-form>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      username: '胡不喜',
      password: '123321',
    };
  },
  computed:{
    //   ...mapState('login',[''])
  },
  methods: {
      ...mapActions('login',['loginTo']),
    onSubmit(values) {
        //   console.log('submit', values);
        let obj = {
            username:this.username,
            password:this.password,
            type:'customer'
        }
        this.loginTo(obj).then(r=>{
            this.$router.push({path:'/home/user'})
        })
    },
  },
};
</script>   
<style scoped>
.header{
    width: 100%;
    height: 250px;
    background: #161616 url(../assets/login/fruit.jpg) no-repeat;
    background-size:cover;
    position: relative;
}
.header_logo{
    width: 70px;
    height: 70px;
    border: 2px solid #fff;
    border-radius: 100%;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 70px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
}
.header_title{
    text-align: center;
    color: #fff;
    position: absolute;
    bottom: 20%;
    left: 35%;
    font-size: 24px;
    font-weight: bold;
}
.header_title span{
     font-size: 20px;
    font-weight: bold;
}
.van-button--info{
    background-color: teal;
}
</style>