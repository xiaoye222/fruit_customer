<template>
    <div>
         <van-nav-bar
            title="修改地址"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />  

         <div class="content">
            <van-field v-model="addInfo.province" label="省" />
            <van-field v-model="addInfo.city" label="市" />
            <van-field v-model="addInfo.area" label="区" />
            <van-field v-model="addInfo.address" label="详细地址" />
            <van-field v-model="addInfo.telephone" type="tel" label="手机号" />   
            <div>
            <van-button type="danger" @click="onSave()">修改</van-button>     
            </div>   
            <div>
            <van-button type="danger" @click="onDelete()">删除</van-button>     
            </div>
            </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
   data() {
    return {
      index:'',
      addInfo :{},
    };
  },

  created(){
    this.load()
  },
  methods: {
      ...mapActions('user',['addressAddOrEdit','deleteAddress']),
       // 返回
        goBack(){
            this.$router.go(-1)
        },
        load(){
            let index = this.$route.query.index
            console.log(index);
            this.addInfo = JSON.parse(localStorage.getItem('addressList'))[index]
            this.addInfo.address=this.addInfo.address_local
            this.addInfo.telephone=this.addInfo.tel
            this.addInfo.customerId=localStorage.getItem('userId')
        },

    onSave() {
        console.log(this.addInfo,'this.addInfo');
      this.addressAddOrEdit(this.addInfo).then(r=>{
          console.log("=================",r);
          this.$router.push({path:'/home/user/address'})

      })
    },
    onDelete() {
        this.deleteAddress({id:this.addInfo.id}).then(r=>{
            console.log("删除的结果是：",r);
        }
        )
    },
    
  },
}
</script>

<style lang='scss' scoped>
    .content{
        padding: 10px 0;
        div{
            display: flex;
            justify-content: center;
            margin: 20px auto;
        }
        .van-button__content{
            margin: 0 auto;
        }

        .van-button--danger{
          width: 80%;
        }

        
       
    }
</style>