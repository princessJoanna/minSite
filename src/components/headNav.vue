<template>
<div>
    <div class="topNav" id="topNav">
     
      <div class="cont">
       
          <span class="btnNav btn" @click="showMenu"><img src="static/images/menu.png" ></span>
       <router-link  to="index" class="goHome">
       </router-link>
          <span class="btnChat btn">
                <router-link  to="chat" >
                    <img src="static/images/call.png" >
                </router-link>
            </span>
      </div>
  </div>
</div>

</template>
<script>
var start = 0;
var startX = 0;
var vm = {};
export default {
  data() {
    return {
      scrollY: 0,
      touchY: 0
    };
  },
  mounted() {
    // this.touchDir();
    this.scrollEvent();
  },

  created() {
    vm = this;
  },

  methods: {
    showMenu() {
      this.$store.commit("setNav", {
        isShow: true,
        current: this.$store.getters.nav.current
      });
    },
    hideMenu() {
      this.$store.commit("setNav", {
        isShow: false,
        current: this.$store.getters.nav.current
      });
      return false;
    },
    scrollEvent() {
      var domNav=document.getElementById('topNav');
      var _self=this;
      window.addEventListener("scroll", function(e) {
        if(!domNav){
          return
        }
        var scrollTop=_self.getScrollTop();
        var screnHt=document.body.clientHeight;
        if(scrollTop>screnHt/3){
            domNav.style.display="none";
            return
        }
        domNav.style.display="block";
        return
      });
    },
     getScrollTop(){   
        var scrollTop=0;   
        if(document.documentElement&&document.documentElement.scrollTop){   
            scrollTop=document.documentElement.scrollTop;   
        }else if(document.body){   
            scrollTop=document.body.scrollTop;   
        }   
        return scrollTop;   
    }   

    // touchEvent() {
    //   var touchStart = 0;
    //   document.body.addEventListener( "touchstart", function(e) {

    //     //  e.preventDefault();
    //       touchStart = e.changedTouches[0].pageY;
    //       startX= e.changedTouches[0].pageX;

    //     });
    //      document.body.addEventListener( "touchmove", function(e) {

    //     });
    //   document.body.addEventListener("touchend",function(e) {

    //     if(!document.getElementById('topNav')){
    //       return
    //     }
    //       var touchEnd = e.changedTouches[0].pageY;
    //           vm.touchY=touchEnd - touchStart;//test
    //           vm.touchX=e.changedTouches[0].pageX-startX;
    //         // if(Math.abs(vm.touchX-vm.touchY)>0){
    //         //     startX=e.changedTouches[0].pageX;
    //         //   return
    //         // }
    //         console.log(touchEnd - touchStart,'toucheY');
    //       if (touchEnd - touchStart < -5) {
    //         topNav.style.display = "none";
    //         touchStart = touchEnd;
    //         return;
    //       }
    //       if (touchEnd - touchStart > 5) {
    //         topNav.style.display = "block";
    //         touchStart = touchEnd;
    //       }
    //     });
    // },
    // scrollEvent() {
    //   window.addEventListener("scroll",function(e) {
    //    var scrollTop=document.documentElement.scrollTop ;

    //    //scrollY
    //      if(!document.getElementById('topNav')){
    //       return
    //     }
    //     console.log(scrollTop-vm.scrollY,'scrollY');
    //       if(scrollTop-vm.scrollY<-5){
    //             topNav.style.display = "none";
    //             vm.scrollY=scrollTop;
    //             return
    //       }
    //       if(scrollTop-vm.scrollY>5){
    //           topNav.style.display = "block";
    //           vm.scrollY=scrollTop;
    //           return
    //       }
    //    }
    //   );
    // }
  }
};
</script>
<style scoped >
.topNav {
  height: 0.5rem;
  background: #f5f5f5;
  overflow: hidden;
  line-height: 0.5rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  transition: width 1s;
  box-shadow: 0px 2px 1px #ccc;
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
.topNav .btnChat {
  float: right;
}
.topNav .btn {
  display: inline-block;
  width: 0.17rem;
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

