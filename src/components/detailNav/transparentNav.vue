<template>
<div>
    <div class="topNav" id="transparentNav">
     
      <div class="cont">
       
          <span class="btnNav btnLeft" @click="goBack1"><img src="static/images/chevron left.png" class="imgSize" ></span>
       <router-link  to="/index" class="goHome">
           <img src="static/images/in.png" class="imgLogoSize">
       </router-link>
        <span class="btnChat btn">
            <router-link  to="/chat" >
                <img src="static/images/callicon.png" >
            </router-link>
        </span>
      </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goBack1(){
      window.history.back(); 
    }
  }
}
</script>

<style scoped>
.topNav {
  height: 0.5rem;
  background: url(https://img.wesetup.cn/Rectangle.png) no-repeat center;
  overflow: hidden;
  position: absolute;
  z-index:9;
  width: 100%;
  top: 0;
  z-index: 2;
  transition: width 1s;
  box-shadow: 0px 2px 1px #969595;

}
.topNav .cont {
  margin: 0 0.16rem;
  height: 100%;
  background-size: 0.17rem;
}
.topNav .btnNav {
  float: left;
}
.imgSize{
    width:.11rem;
    height:.17rem;
}
.imgLogoSize{
     width:.17rem;
    height:.17rem;
}
.topNav .btnChat {
  float: right;
}
.topNav .btn {
  display: inline-block;
  width: 0.17rem;
}
.topNav .btnLeft {
  display: inline-block;
  width: 0.11rem;
}
.topNav .btnLeft img {
  width: 100%;
  display: block;
  margin-top: .16rem;
}
.topNav .btn img {
  width: 100%;
  display: block;
  margin-top: .16rem;
}
.goHome {
     display: inline-block;
    position: absolute;
    width: .4rem;
    height: 0.5rem;
    left: 50%;
    margin-left: -.1rem;
    margin-top: .17rem;
}
.test {
  width: 100%;
  position: fixed;
  bottom: 0.2rem;
  z-index: 99999999;
  height: 0.2rem;
  line-height: 0.2rem;
  background: #fff;
  color: #000;
  font-size: 16px;
}
</style>

