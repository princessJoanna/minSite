<template>
	<div id="designHorizeList" class="designer-horize-list-c" ref="designHorizeList">
		<div class="designer-c">
			<div class="list-title-c">
				<div class="vertical-bar">
				</div>
				<span class="list-title">
					找设计师
				</span>
				<router-link to="/desinerList" tag="span" class="more">
					查看更多
				</router-link>
			</div>
			<div  class="designer-detail-list-c">
				<swiper :options="designerOption" >
			    <!-- slides -->
			    <swiper-slide class="designer-item" v-for="(designer,index) in designerList" :key="index">
			    	<router-link :to="'/desinerDetails/'+designer.designer_uid" tag="div" class="detail-designer">
			    		<!--<div  class="detail-designer">-->
							<div class="img-c" >
								<img :src="designer.full_body_shot_url" />
							</div>
							<div class="design-des-c">
								<p class="name">{{designer.designer_name}}</p>
								<p class="profession" >{{designer.city}} | {{designer.plantform_descript}}</p>
								<!-- <p class="level">{{designer.designer_level}}</p> -->
							</div>
						<!--</div>-->
			    	</router-link>
			    </swiper-slide>
			    <!-- Optional controls -->
			    <!--<div class="swiper-pagination"  slot="pagination"></div>-->
			  </swiper>
			</div>
		</div>
	</div>
</template>
<script>
import store from "@/store";
import { getDesinerMes } from "@/api/desinerList";
export default {
  data() {
    return {
      designerList: [],
      // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
      // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
      notNextTick: true,
      designerOption: {
        pagination: "null",
        slidesPerView: "auto",
        paginationClickable: true,
        onTransitionStart(swiper) {},
        onClick(swiper) {}
        // more Swiper configs and callbacks...
        // ...
      }
    };
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
	   this.getList({ page_size: 6, page_no: 1})
      .then(json => {
        if (json.body.code == "200") {
          this.designerList = json.body.data.result;
        }
      })
      .catch(err => {});
  },
  methods: {
    getList(params) {
      var _self = this;
      return new Promise((resolve, reject) => {
        getDesinerMes(params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
</script>
<style scoped="scoped">
.designer-horize-list-c {
  background: #fff;
}
.designer-detail-list-c .designer-item {
  height: auto;
}
.designer-horize-list-c .designer-c {
  margin-left: 0.14rem;
}
.list-title-c {
  padding-top: 20px;
  padding-bottom: 16px;
}
.vertical-bar {
  height: 0.12rem;
  width: 0.04rem;
  background: #b2dd47;
  margin-right: 0.08rem;
  float: left;
}
.list-title-c:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.list-title {
  font-size: 0.14rem;
  /* line-height: 0.12rem; */
  color: #000;
  float: left;
  font-weight: bold;
}
.list-title-c .more {
  float: right;
  margin-right: 14px;
  margin-bottom: 0px;
}
.designer-detail-list-c {
  width: auto;
}
.designer-detail-list-c:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.designer-item {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 1.5rem;

  margin-right: 0.09rem;
}
.detail-designer {
  width: 100%;
  float: left;
}
.img-c {
  width:1.4rem;
}
.img-c img {
  width: 100%;
  display: block;
}
.design-des-c p {
  text-align: left;
  margin: 0;
  padding: 0;
}
.design-des-c {
  width: auto;
  margin-bottom: 0.16rem;
}
.design-des-c:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.design-des-c .name {
  font-size: 0.14rem;
  line-height: 0.18rem;
  margin-bottom: 0.04rem;
  margin-top:.06rem;
}
.design-des-c .profession {
  font-size: 0.11rem;
  line-height: 0.14rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}
.design-des-c .level {
  color: #5fa333;
  font-size: 0.11rem;
  line-height: 0.14rem;
}
</style>