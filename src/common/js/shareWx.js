import wx from 'weixin-js-sdk'
import Vue from 'vue'

const getId= function (){
var api= '/weixin/getWXUrl';
  Vue.http.post(api,{"shareUrl": window.location.href.replace(location.hash, "")})
    .then(function(res) {

      if (res.status != "200") {
        return
      }
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.data.signature, // 必填，签名
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "onVoicePlayEnd",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage"
        ] // 必填，需要使用的JS接口列表
      });
    })
    .catch(err => {
    
    });
}

const  shareReady=function(title,desc,imgUrl,link){
  var qiniuImg=process.env.QINIU_IMG;
  var BASE_API=window.location.href;
    wx.ready(function() {
        // 在这里调用 API
        wx.onMenuShareAppMessage({
          link:link||window.location.href,
          title: title||'设计IN-设计师严选平台', // 分享标题
          desc: desc, // 分享描述
          imgUrl: imgUrl||qiniuImg+'logo.png', // 分享图标
          success: function(success) {
            
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareTimeline({
            link:link||window.location.href,
            title: title||'设计IN-设计师严选平台', // 分享标题
            desc: desc, // 分享描述
            imgUrl: imgUrl||qiniuImg+'logo.png', // 分享图标
          success: function(success) {
          
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.error(function(res) {
        
        });
      });
}



export default {getId,shareReady}
