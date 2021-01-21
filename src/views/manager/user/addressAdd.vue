<template>
    <div>

         <van-nav-bar
            title="新增地址"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            />  

          <div class="content">
            <van-field v-model="add.province" label="省" />
            <van-field v-model="add.city" label="市" />
            <van-field v-model="add.area" label="区" />
            <van-field v-model="add.address" label="详细地址" />
            <van-field v-model="add.telephone" type="tel" label="手机号" />      
            <div>
            <van-button type="danger" round @click="onSave(add)">新增</van-button>     
            </div>
            </div>
          
        
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import { Notify } from 'vant';
export default {
   data() {
    return {
      add:{
        province:'',
        city:'',
        area:'',
        address:'',
        telephone:'',
        customerId:this.userId
      }
    };
  },
  created(){
      this.add.customerId = localStorage.getItem('userId')
  },
  methods: {

    ...mapActions('user',['addressAddOrEdit']),
     // 返回
    goBack(){
            this.$router.go(-1)
        },

    onSave(add) {
      this.addressAddOrEdit(add).then(r=>{
        if(r.status==200){
        Notify({ type: 'success', message: '新增成功' });
        }
      })
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
            // border: 1px solid sandybrown;
        }
        .van-button__content{
            margin: 0 auto;
        }

        .van-button--danger{
          width: 80%;
        }

        
       
    }
</style>