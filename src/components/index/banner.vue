<template>
	<div class="banner-c">
			  <swiper :options="swiperOption" >
			    <!-- slides -->
			    <!--<swiper-slide class="swiper-item" v-for="(item,index) in banner" :key="index">
			    		<img :src="item.link"  :loc="item.src"/>
			    </swiper-slide>-->
			    <swiper-slide class="swiper-item" v-for="(item,index) in banner" :key="index">
			    	<img :src="item.link" :loc="item.src" />
			    </swiper-slide>
			    <!-- Optional controls -->
			    <div class="swiper-pagination"  slot="pagination"></div>
			  </swiper>
		
	</div>

</template>
<script>
  // swiper options example:
  export default {
    name: 'carrousel',
    data() {
      return {
      	banner:[
      		{link:"https://img.wesetup.cn/banner_P1.jpg",src:"http://g.eqxiu.com/s/JSiNdILo"}//,

      	],

        swiperOption: {
          autoplay: 3000,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationType:'bullets',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,

          onTransitionStart (swiper) {
          },
          onClick(swiper){
          	window.location.href = swiper.$(swiper.clickedSlide).children("img").attr("loc");
          }
        }
      }
    },
   
    computed: {

    },
    mounted() {

    }
  }
</script>
<style >
	.banner-c {
		width: 100%;
		background:#fff;
	}
	.banner-c:after{
		height: 0.09rem;
		background: #f4f4f4;
		display: block;
		content: " ";
	}
	.swiper-container {
		overflow: hidden;
		position: relative;
	}
	
	.banner-c .swiper-wrapper{
		height:100%;
		overflow: hidden;
	}
  .swiper-item {
    height: 100%;
    float: left;
  }
  .swiper-item img{
  	display: block;
  	width: 100%;
  }
  .swiper-pagination{
  	height:0.2rem;
  	position:absolute;
  	width:100%;
  	bottom:0px;
  	left:0px;
  	text-align: center;
  }
  .swiper-pagination-bullet{
  	width:0.2rem;
  	height:0.02rem;
  	opacity: .6;
  	background:#fff;
  	display: inline-block;
  	margin: 0px 0.04rem;
  }
  .swiper-pagination-bullet-active{
  	background:#fff;
  	opacity: 1;
  }
</style>