<template>
    <div class="money">
            <van-nav-bar
            title="地址列表"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />  
            <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
            />
      
    </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from 'vuex'
export default {
    data(){
        return {
            show:true,
            userId:'',
            chosenAddressId: '',
        }
    },
    created() {
        this.load()
        console.log(this.$store.state.user,"created");
    },

    
    computed:{
        ...mapState('user',['addressInfo']),
        ...mapGetters('user', {
            addressList:'addressList'
    })
    },
    methods:{
        ...mapActions('user',['findAddressByCustomerId']),
    
        onAdd() {
            this.$router.push({path:'/home/user/address/add'})
        },
        onEdit(item, index) {
            this.$router.push({path:'/home/user/address/edit',query:{item:item,index:index}})
        },
        onSelect(item, index){
            this.$store.state.user.defaultAddressId=item.id
            // item.isDefault=true
            // this.$router.go(-1)
            // 点击默认选择

            // find(item => item.id === id)

        },

        // 加载用户相关信息
        load(){
            this.userId = localStorage.getItem('userId')
            this.username = localStorage.getItem('username')
            this.findAddressByCustomerId({id:this.userId}).then(r=>{
               console.log(this.addressInfo);
               this.chosenAddressId=this.$store.state.user.defaultAddressId
            })
           
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
         .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .block {
            width: 120px;
            height: 120px;
            background-color: #fff;
        }
    }
</style>