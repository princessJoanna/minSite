<template>
  <div class="appoinmnet">
      <div class="main">
    
          <div class="fl">
              <div class="head">
                 <img :src="desiner.head_image_url" >
             </div>
                <div class="aside">
                  <p class="name">{{desiner.designer_name}}</p>
                    <!-- <p class="level">高级设计师</p> -->
              </div>
          </div>
          <div class="orderDesiner" @click="appoinmnet">预约设计师</div>
       
      </div>
  </div>
</template>
<script>


import { MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { miniSiteAppoints } from '@/api/appoints'; //预约设计师
import { checkAppointsStatus } from '@/api/checkAppointsStatus';
import { checkLoginStatus } from '@/api/CheckLoginStatus';//查询是否绑定
export default {
  props: ["desiner"],
  data() {
    return {
      authorization_id:'',
    };
  },
  created() {
    this.getState();
 
  },
  mounted(){
  },

  methods: {
    appoinmnet() {
      var _self=this;
    
      //查询是否授权绑定用户
        checkLoginStatus({authorization_id:this.desiner.authorId})
        .then(function(response){
          // console.log(response.data.data.userId);
            if(response.data.code!=200){
                   return MessageBox('提示', '查询失败');
            }
          //  response.data.data.userId===null || response.data.data.userId =='' || response.data.data.userId == undefined
            if(response.data.data.userId == null || response.data.data.userId =='' || response.data.data.userId == undefined){ //如果没有绑定跳转登录页面
                 return _self.$router.push({path:'/login?designer_uid='+_self.desiner.designer_uid})
            }
            var user_id = response.data.data.userId;
            checkAppointsStatus({user_id: user_id})
            .then(function(response){
              
              if( response.data.code==200 && response.data.data.message.length == 17 ){ //设计师ID长度为17
                  return MessageBox('你已经预约过了');
                  // return setTimeout(function(){
                  //       history.go(-1);
                  //    })  
              }

              miniSiteAppoints({"designer_uid":_self.desiner.designer_uid,"user_id":user_id} ) //预约设计师
              .then(function(response){
                    if(response.data.code==500){
                        return MessageBox('提示', '你已经预约过了');
                    } 
                    if(response.data.code==200){
                      return MessageBox('提示', '预约成功');
                    //    setTimeout(function(){
                    //     history.go(-1);
                    //  })
                    }
                    return MessageBox('提示', '查询异常')
              })

            })


        })
        .catch(function(error){
        
            return MessageBox('提示', '请求失败');
        })
    },
    getState() {

      this.desinerMes = this.$store.getters.appointment;
      this.authorization_id=this.$store.getters.wxAuthorize;
  
    }
  }
};
</script>

<style>
.appoinmnet {
  box-shadow: -4px -3px 14px #ccc;
  padding: 0.08rem 0;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
}
.appoinmnet .main {
  height: 0.46rem;
  padding: 0 0.18rem;
  overflow: hidden;
}
.appoinmnet .fl {
  float: left;
}
.appoinmnet .head {
  width: 0.35rem;
  display: inline-block;
  margin-right: 0.1rem;
  float: left;
  margin-top: 0.16rem;
  /* margin-top:.1rem; */
}
.appoinmnet .head img {
  display: block;
  width: 100%;
  border-radius: 50%;
}
.appoinmnet .aside {
  display: inline-block;
  margin-top: 0.18rem;
}
.appoinmnet .aside .name {
  font-size: 0.16rem;
  margin: 0;
}
.appoinmnet .orderDesiner {
  display: inline-block;
  margin-top: 0.1rem;
  background-color: #79e149;
  color: #fff;
  padding: 0.06rem 0.07rem;
  border-radius: 0.02rem;
  font-size: 0.14rem;
  float: right;
}
.appoinmnet .score {
  width: 1rem;
}
.appoinmnet .level {
  color: #93d36a;
  margin: 0.02rem 0 0 0;
  font-size: 0.12rem;
}
</style>

