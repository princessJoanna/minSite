<template>
    <div class="page-swiper desinerDetails">
        <swiper :options="swiperOptionPae">
            <swiper-slide>
                <zoom :zoomMes="zoomData"></zoom>
            </swiper-slide>
            <swiper-slide>
                <self :selfMes="selfData" ref="childMethod"></self>
            </swiper-slide>
            <swiper-slide v-if="zoomData.designer_level">
                <caseList  :caseList="caseData" v-on:goDetails="goDetails" :level="zoomData.designer_level"></caseList>
            </swiper-slide>
            <swiper-slide class="caseDetilas" id="caseDetilas">
                <div v-html="caseDetails"></div>
            </swiper-slide>
            <div class="swiper-scrollbar"></div>
        </swiper>
    </div>
</template>
<style  >
html {
  font-size: 100px;
  position: relative;
  height: 100%;
}

body {
  font-size: 14px;
  padding: 0;
  margin: 0;
  height: 100%;
}

.hide {
  display: none;
}

.video-js,
video,
.vjs-tech {
  width: 100%;
}
.container {
    padding-top:0;
    height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.desinerDetails ,.desinerDetails  .swiper-slide,.desinerDetails  .swiper-container{
  height:100%;
 
}

img,video{
  max-width:100%;
}
.hasTips {
  position: relative;
}

.zoom-wrap .hasTips .memo {
  height: 2.4rem;
}

.caseDetilas {
  width: 100%;
  overflow: scroll;
}
</style>

<script>

import Vue from 'vue'
import '@/common/css/swiper.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import zoom from "../components/desiner/zoom";
import self from "../components/desiner/self";
import caseList from "../components/desiner/caseList";
import whiteNav from "../components/detailNav/whiteNav";
import transparentNav from "../components/detailNav/transparentNav";
Vue.use(VueAwesomeSwiper)

var vm = {},
  _initia = 0;
export default {
  components: { zoom, self, caseList, whiteNav, transparentNav },
  data() {
    return {
      designer_name:'',
      head_image_url:'',
      caseSlideIndex: 0,
      caseId:0,
      _initia: 0,
      swiper: {},
      zoomData: {},
      selfData: {},
      caseData: [],
      caseDetails: "",
      swiperOptionPae: {
        scrollbarHide: false,
        direction: "vertical",
        // initialSlide: _initia,
        initialSlide:0,
        onSlideChangeStart(swiper) {
          _initia = swiper.activeIndex;
          if (_initia == 2 && vm.zoomData.name) {
            document.title = vm.zoomData.name + "的案例";
          } else {
            document.title = "设计师详情";
          }
       
          if (swiper.activeIndex == 3) {
              var designer_uid = vm.$route.params.designer_uid;
              window.location.replace("./#/desinerCaseDetails/" +vm.$route.params.desiner_id+'?caseId='+vm.caseId+ "&caseSlideIndex=" + vm.caseSlideIndex)
          //  window.location.href ="./#/desinerCaseDetails/" +vm.$route.params.desiner_id +'?caseId='+vm.caseId+ "&caseSlideIndex=" + vm.caseSlideIndex ;
          
          }
        },
        onTouchEnd(swiper) {}
      }
    };
  },

  beforeCreate() {
    vm = this;
    if (this.$route.query.startIndex - 0) {
      _initia = 2;
    }
     
  },
  created(){
        this.getData();
  },
  beforeMount() {
    // this.getData();
   
  },
mounted(){
  },
  methods: {
    goDetails(swiper) {
      this.swiper = swiper;
      this.caseSlideIndex = swiper.activeIndex;
      this.caseDetails = this.caseData.list[swiper.activeIndex].case_detail;
      this.caseId=this.caseData.list[swiper.activeIndex].designer_case_uid;
    },
    getData() { 

      var _self=this;
      var _designer_uid = this.$route.params.desiner_id;
      this.$store.dispatch("GetDesinerDetails",{designer_uid:_designer_uid})
        .then((response) => {
          _self.designer_name = response.data.data.designer_name;
          _self.head_image_url = response.data.data.head_image_url;
          this.$nextTick(function(){
            this.shareWx.getId();
            this.shareWx.shareReady(_self.designer_name+"| 设计IN-设计师严选平台" ,'',_self.head_image_url+'?imageView2/5/w/50');
          });
          _self.setData(response.data.data);
        })
        .catch(error => {
        
        });
    },
    setData(data) {
      this.caseDetails = data.designer_case_list[0].case_detail;
      this.zoomData = {
        name: data.designer_name,
        score: data.designer_level,
        headImg: data.full_body_shot_url,
        head_image_url: data.head_image_url,
        price: data.designer_price,
        brief: data.plantform_descript,
        designer_level: data.designer_level,
        designer_high_price:data.designer_high_price
      };
      this.selfData = {
        brief: data.descript,
        bodyImg: data.personality_photo_url,
        brief: data.descript,
        video: data.self_introduction_video_url
      };
      this.caseData = {
        list: data.designer_case_list,
        score:data.designer_level,
      };
      if (_initia == 2) {
        document.title = data.designer_name + "的案例";
        return;
      }
      document.title = "设计师详情";
    },
  }
};
</script>

