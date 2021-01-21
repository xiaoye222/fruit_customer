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
            chosenAddressId: '1',
        }
    },
    created() {
        this.load()
        this.mark()
    },
    updated() {
        this.load()
        this.mark()
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
             console.log('新增地址');
            this.$router.push({path:'/home/user/address/add'})
        },
        onEdit(item, index) {
            this.$router.push({path:'/home/user/address/edit',query:{index:index}})
        },

        // 加载用户相关信息
        load(){
            this.userId = localStorage.getItem('userId')
            this.username = localStorage.getItem('username')
            this.findAddressByCustomerId({id:this.userId}).then(r=>{
               console.log(this.addressInfo);
            })
        },

        mark(){
            this.addressInfo.map((item)=>{
                let add={}
                add.id=item.id
                add.province=item.province
                add.city=item.city
                add.area=item.area
                add.address_local=item.address
                add.address=item.province+item.city+item.area+item.address
                add.tel=item.telephone
                add.name=this.username
                add.isDefault=false
                this.addressList.push(add)
            })
            localStorage.setItem('addressList',JSON.stringify(this.addressList))
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