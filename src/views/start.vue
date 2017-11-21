<template>
  
</template>
<script>
export default {
    beforeCreate(){
     if(!getCookie("isFirstLoad")){
        setCookie('isFirstLoad',true,60*24*30*12);
        window.location.href="/#/guide";
      return

    }
      window.location.href="/#/index";
  },
}

  function setCookie(name, value, seconds) {
    seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    if (seconds != 0 ) { //设置cookie生存时间
    var date = new Date();
    date.setTime(date.getTime()+(seconds*1000));
    expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+escape(value)+expires+"; path=/"; //转码并赋值
    }
  function  getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
      }
</script>

