<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home/shouye">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/order">订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:0
    }
  }
}
</script>
