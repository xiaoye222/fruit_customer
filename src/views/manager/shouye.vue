<template>
    <div class="shouye">
        <div class="header">
            <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item>
                <img src='../../assets/home.jpg'>
            </van-swipe-item>
            <van-swipe-item>
                <img src='../../assets/home.jpeg'>
            </van-swipe-item>
            <van-swipe-item>
                <img src='../../assets/home1.jpeg'>
            </van-swipe-item>
             <van-swipe-item>
                <img src='../../assets/home2.jpeg'>
            </van-swipe-item>
            
            </van-swipe>
        </div>
        <div class="content">

            <van-grid :column-num="3">
                <van-grid-item v-for="(value,index) in arr" @click="toGo(value.id,index)" :key="value.id" :icon="value.icon" :text="value.name" />
                <van-grid-item @click='toDetails' icon="home-o" text="" badge="更多" />
            </van-grid>

            <van-grid :border="false" :column-num="2">  
            <van-grid-item v-for="item in product" :key='item.id' @click="toProductDetail(item)">
                <van-image :src="item.photo" />
                <div style="margin-top:20px">{{item.name}}</div>
            </van-grid-item>  
            </van-grid>

        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return {
            arr:[],
        }
    },
    computed:{
        ...mapState('shouye',['category','product']),
        ...mapGetters('shouye', {
            secondCategory: 'secondCategory', //
        }),
    },
    created(){
        this.load()
        this.loadProduct()
    },
    methods:{
        ...mapActions('shouye',['loadCategory','loadProduct']),
        toGo(id,index){
            this.$router.push({path:'/home/productList',query:{oid:id,index:index}})
        },
        toDetails(){
            this.$router.push({path:'/home/productList',query:{test:true}})
        },
        load(){
            this.loadCategory().then(r=>{
                this.arr = this.secondCategory
                this.arr.length = 5
            })
        },
        // 进入商品详情页面
        toProductDetail(pro){
            this.$router.push({path:'/home/productDetail',query:{product:JSON.stringify(pro)}})
        }

    }
}
</script>
<style scoped>
.header{
    height: 250px;
}
.header img{
    height: 250px;
    width: 100%;
}

</style>