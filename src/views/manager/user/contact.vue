<template>
    <div>
        <van-nav-bar
            title="联系我们"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />  
        <van-image
            src="https://wx2.sinaimg.cn/mw690/006WBEQFly1gnl2ml4mpzj30qe0z6gp9.jpg"
        />
    </div>
</template>

<script>
export default {
    methods: {
        
        goBack(){
            this.$router.go(-1)
        },
    },
}
</script>