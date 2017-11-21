<template>
  <div class="login-c">
      <p class="login-title">手机号验证登录</p>
      <div class="valid-send-des-c">
      	<p class="valid-send-des" v-show="isSend">验证码已发送</p>
      </div>
      <div class="input-c">
      	<div class="phone-num-c">
	      	<input class="phone-num" @keyup="validatePhone($el,$event)"  maxlength="11"   id="phone" placeholder="输入手机号" type="tel"/>
	      	<span @click="clearPhone"  class="phone-remove-icon"></span> 
      	</div>
      	<div class="valid-c">
	      	<input class="valid-code" @keyup="validCode" id="validCode" maxlength="4" placeholder="输入验证码" type="number"/>
	      	<input type="button" id="validBtn" v-bind:class="['valid-btn',{'valid-enable':validEnable}]"  @click="getValidCode" :disabled="isDisable" value="获取验证码"/>
      	</div>
      </div>
  
      <input type="button" @click="doLogin" v-bind:class="['login-btn-c',{'login-btn-enable':loginEnable}]" :disabled="loginBtnDisable" value="验证登录"/>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { sendMsg } from "../api/login";
import { getUserInfo } from "../api/login";
import { miniSiteAppoints } from '@/api/appoints'; //预约设计师
const reg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
const regNum = /^([0-9]{4})$/;
export default {
	data(){
		return {
			isSend:false,
			isDisable:true,
			validEnable:false,
			loginEnable:false, // 登陆样式
			loginBtnDisable:true, // 登陆是否可以点击
			user_id:null,
			authorization_id:null,
			designer_uid:null,
		}
	},
  mounted(){
  	document.getElementById("app").style.paddingTop = 0;
  },
  methods:{
	//登陆
  	doLogin:function(){
		var _self = this;
		this.designer_uid = this.$route.query.designer_uid;
		this.authorization_id=this.getCookie("wechat_id");
		this.$store
			.dispatch("GetUserInfo", { "phone_num":document.getElementById("phone").value, 'message_code':document.getElementById("validCode").value, 'authorization_id':this.authorization_id })
			.then((data) => {
				if(data.body.code != 200){
					return
				}
				_self.loginBtnDisable = true;
				_self.loginEnable = false;
				setTimeout(function(){
					_self.loginBtnDisable = false;
					_self.loginEnable = true;
				},60000)
				_self.user_id=data.body.data.user_id
				miniSiteAppoints({"designer_uid":_self.designer_uid,"user_id":_self.user_id} ) //预约设计师
					.then(function(response){
						if(response.data.code!=200){
							return MessageBox('提示', '查询异常');
						} 
						MessageBox('提示', '预约成功');
						return setTimeout(function(){
							history.go(-1);
						})
				})
			
			})
			
			.catch(err => {
					 MessageBox('提示', '连接失败');
        });
		
	  },
	//   查询是否预约
	/**@augments
	 * 查询预约记录接口
	 * url : /Designer/checkAppointsStatus
	 * @param  {"user_id":"43320788568244268"}
	 * 如果有预约记录 返回设计师id
	 * success
	 * "code": 200,
  		"data": {
    		"message": "43207696962329537"   //message里面为设计师id
		}
	 */
	searchInfo(user_id){

	},
	//预约设计师
	/**@augments
	 * 预约设计师接口
	 * url : /Designer/miniSiteAppoints
	 * @param {"designer_uid":"43207696962329537","user_id":"43320788568244268"} 
	 * success 
	 * {
		"code": 200,
		"data": {
			"message": "预约成功！"
		},
	*/
	reserveDesiner(designer_uid,user_id){
		
	},

  	validLogin:function(){
  		if(this.validPhone() && this.validValidcode()){
  			this.loginBtnDisable = false;
  			this.loginEnable = true;
  		}else{
  			this.loginBtnDisable = true;
  			this.loginEnable = false;
  		}
  	},
  	validCode:function(){
  		this.validLogin();
  	},
  	validatePhone:function(el,e){
  		let result = this.validPhone();
			this.isDisable = !result;
			this.validEnable = result;
			this.validLogin();
	  },
	// 清除手机号码
  	clearPhone:function(){
  		document.getElementById("phone").value="";
  	},
  	getValidCode:function(){
		 var _self=this;
  		this.isDisable = true;
			this.validEnable = false;
			this.resend(document.getElementById("validBtn"),this);
  		sendMsg({"phone_num":document.getElementById("phone").value})
  		.then(function(data){
  			if(data.body.code == 200){
  				_self.isSend = true;
  			}
  		},function(err){
  			//
  		});
  		
  	},
  	resend:(element,vue)=>{
			  let num = 60;
			  let timer = setInterval(function () {
			    num--
			    element.value = num + 'S';
			    if (num === 0) {
			    	if(vue.validPhone()){
				      vue.isDisable = false;
							vue.validEnable = true;
			    	}
			      element.value = '获取验证码';
			      clearInterval(timer)
			    }
			  }, 1000)
  	},
  	validPhone:()=> reg.test(document.getElementById("phone").value.trim()),
		validValidcode:()=> regNum.test(document.getElementById("validCode").value),
		 getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
      }
  }
};
</script>
<style scoped="scoped">
.login-c {
  width: 100%;
  height: 100%;
  background: url(../../static/images/login_bg@2x.png);
  background-size: 100%;
}
.login-title {
  font-size: 0.26rem;
  color: #8d8d8d;
  text-align: center;
  margin: 0;
  padding-top: 0.5rem;
  margin-bottom: 0.23rem;
  letter-spacing: 0.02rem;
}
.valid-send-des-c {
  height: 0.29rem;
  margin-bottom: 1rem;
}
.valid-send-des {
  font-size: 0.26rem;
  color: #82dd46;
  text-align: center;
  margin-top: 0;
}
.input-c {
  text-align: center;
  padding: 0 0.6rem;
}
.valid-c,
.phone-num-c {
  position: relative;
  width: 100%;
  border-bottom: 0.01rem #c6c6c6 solid;
  text-align: left;
}
.phone-num-c {
  margin-bottom: 0.5rem;
}
.phone-num-c .phone-num,
.valid-c .valid-code {
  font-size: 0.22rem;
  display: inline-block;
  border: none;
  outline: none;
  background: transparent;
  border-radius: 0;
  line-height: 0.34rem;
  letter-spacing: 0.01rem;
  color: #555555;
  z-index: 1;
  width: 85%;
}
.valid-c .valid-code {
  width: 60%;
}
.phone-remove-icon {
  display: inline-block;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
  background: url(../../static/images/revoke2.png);
  background-size: 100%;
  width: 0.18rem;
  height: 0.18rem;
  z-index: 99;
}
.valid-btn {
  width: 0.7rem;
  font-size: 0.12rem;
  position: absolute;
  border-radius: 0.04rem;
  display: inline-block;
  line-height: 0.2rem;
  height: 0.3rem;
  right: 0.1rem;
  bottom: 0.1rem;
  z-index: 99;
  padding: 0px;
  margin: 0px;
  border: 1px solid #9c9c9c;
  color: #5e5e5e;
}
.valid-enable {
  border: 1px solid #82dd46;
  background-color: #82dd46;
  color: #fff;
}
.login-btn-c {
  padding: 0;
  margin: 0;
  width: 2.47rem;
  margin: 0 auto;
  margin-top: 0.34rem;
  height: 0.36rem;
  border-radius: 0.08rem;
  color: #fff;
  box-shadow: 0px 0px 30px #999;
  text-align: center;
  line-height: 0.36rem;
  font-size: 0.18rem;
  display: block;
  border: 1px solid #9c9c9c;
  background-color: #9c9c9c;
}
.login-btn-enable {
  border: 1px solid #82dd46;
  background-color: #82dd46;
}
</style>
