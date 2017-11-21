<template>
<div>
    <div class="topNav" id="whiteNav">
     
      <div class="cont">
       
          <span class="btnNav btnLeft" @click="goBack1"><img src="static/images/chevronleft black.png" class="imgSize" ></span>
       <router-link  to="/index" class="goHome">
       </router-link>
          <span class="btnChat btn">
                <router-link  to="/chat" >
                    <img src="static/images/call.png" >
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
  background: #f5f5f5;
  overflow: hidden;
  line-height: 0.5rem;
  position: absolute;
  width:100%;
  z-index:9;
  width: 100%;
  top: 0;
  z-index: 2;
  transition: width 1s;
  box-shadow: 0 2px 1px #ccc;
  /* box-shadow: 0px 2px 1px #ccc; */
  /* margin-bottom: .5rem; */
}
.topNav .cont {
  margin: 0 0.16rem;
  background: url(http://ovfllimsi.bkt.clouddn.com/minWebIn.png?imageView2/2/w/80)
    no-repeat center;
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
.topNav .btnChat {
  float: right;
  width: .3rem;
  height: .5rem;
}
.topNav .btn {
  display: inline-block;
  
}
.topNav .btnLeft {
    display: inline-block;
    width: 0.3rem;
    height: .5rem;
}
.topNav .btnLeft img {
  width: .12rem;
  margin-left:.09rem;
  display: block;
  margin-top: .16rem;
}
.topNav .btnChat img {
  width: .16rem;
  display: block;
  margin-left:.09rem;
  margin-top: .16rem;
}
.goHome {
     display: inline-block;
    position: absolute;
    width: .4rem;
    height: 0.5rem;
    left: 50%;
    margin-left: -.2rem;
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

