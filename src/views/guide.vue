<template>
    <swiper :options="swiperOption" ref="mySwiper">
    <div class="swiper-slide"><img class="scrollImg" src="https://img.wesetup.cn/minguide1.png" alt=""></div>
    <div class="swiper-slide"><img class="scrollImg" src="https://img.wesetup.cn/minguide2.png" alt=""></div>
    <div class="swiper-slide"><img class="scrollImg" src="https://img.wesetup.cn/minguide3.png" alt=""></div>
    <div class="swiper-pagination"  slot="pagination"></div>
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
      <div class="button" @click="goHome">
      	<img src="https://img.wesetup.cn/minguidebutton.png" alt="" class="imgSize">
      </div>
  <!-- </div> -->
    </swiper>

</template>
<script>
var vm=this;
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
 name: 'carrousel',
 components: {
    swiper,
    swiperSlide
},
 data() {
   return {
     swiperOption: {
        loop : false,
        autoplay: 3500,
       direction : 'vertical',
       grabCursor : true, //手掌形状，拖动时指针会变成抓手形状
       setWrapperSize :true,
       pagination : '.swiper-pagination',
       paginationClickable :true,
        onSlideChangeEnd: swiper => {
            if(swiper.realIndex==2){
                setTimeout(() => {
                    vm.$router.push({path:'./index'});
                    
                }, 3000);
            }
          }
     }
   }
 },
 mounted(){
    document.getElementById('app').style.paddingTop = 0;
    
      this.$nextTick(function(){
       this.shareWx.getId();
    //    title,desc,link,imgUrl
      this.shareWx.shareReady("设计IN-设计师严选平台",'','https://m.shejiin.net/#/index');
    })
    
     
  },
  created(){
      vm=this;
    
  },

 computed: {
   swiper() {
     return this.$refs.mySwiper.swiper
   }
 },
 methods: {
    goHome(){
        this.$router.push({ path:'/index'});
    }
}
}
</script>
<style scoped>
@import "../common/css/swiper.min.css";
.swiper-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
.swiper-slide{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
.scrollImg{
     width: 100%;
    height: 100%;
}
.button{
    margin:auto;
	position: absolute;
    bottom: .56rem;
    left: 0;
    right: 0;
	height: .36rem;
	width: 1rem;
    /* background: #93D36A; */
    color: #fff;
	line-height: .36rem;
    text-align: center;
    z-index: 999;
}
.button .imgSize{
    width: 100%;
    height: 100%;
}
</style>


