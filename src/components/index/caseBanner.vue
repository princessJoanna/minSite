<template>
	<div class="case-horize-list-c">
		<div class="case-c">
			<div class="list-title-c">
				<div class="vertical-bar">
				</div>
				<span class="list-title">
					看设计案例
				</span>
				<router-link to="/caseList" tag="span" class="more">
					查看更多
				</router-link>
			</div>
			<div class="case-detail-list-c">
				<swiper :options="caseOption" >
			    <!-- slides -->
				    <swiper-slide class="case-item" v-for="(onecase,index) in caseList" :key="index">
			    		<div class="detail-case">
			    				<div class="img-c"  @click="jumpTo(onecase)">
									<img :src="onecase.widescreen_image" />
								</div>
								<div class="des-c">
									<router-link :to="'/desinerDetails/'+onecase.designer_uid" class="portrait" tag="div">
										<img  :src="onecase.head_image_url" />
									</router-link>
									<div class="name-theme-c">
										<p class="theme"  @click="jumpTo(onecase)">{{onecase.title}}</p>
										<router-link :to="'/desinerDetails/'+onecase.designer_uid" tag="p" class="name">
											{{onecase.designer_name}}
										</router-link>
										
									</div>
								</div>
						</div>
				    </swiper-slide>
			  </swiper>
			</div>
		</div>
	</div>
</template>
<script>
import { getCaseMes } from '@/api/caseList';
export default {
  name: "carrousel",
  data() {
    return {
      caseList: [],
      notNextTick: true,
      caseOption: {
        pagination: "null",
        slidesPerView: "auto",
        paginationClickable: true,
        onTransitionStart(swiper) {},
        onClick(swiper) {}

      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
	  this.getList({ page_size: 6, page_no: 1})
      .then(json => {
        if (json.body.code == "200") {
          this.caseList = json.body.data.list;
        }
      })
      .catch(err => {});
  },
  methods: {
    jumpTo(onecase) {
      this.$router.push({path:'./caseDetails/'+onecase.id+'?designer_uid='+onecase.designer_uid});
    },
    getList(params) {
      var _self = this;
      return new Promise((resolve, reject) => {
        getCaseMes(params)
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
.case-horize-list-c {
  background: #fff;
}
.case-horize-list-c:after {
  content: "";
  height: 0.09rem;
  display: block;
  background: #f4f4f4;
}
.case-detail-list-c .case-item {
  height: auto;
}
.case-horize-list-c .case-c {
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
.case-detail-list-c {
  width: auto;
}
.case-detail-list-c:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.case-item {
  width: 45% !important;
  text-align: center;
  font-size: 18px;
  background: #fff;
}

.img-c {
  display: block;
  margin-right: 0.09rem;
  margin-bottom: 0.07rem;
}
.img-c img {
  width: 100%;
  display: block;
}
/*.swiper-slide{
	 flex-shrink: unset;
 }*/
.des-c {
  width: auto;
  margin-bottom: 0.16rem;
  overflow: hidden;
}
.des-c:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.portrait {
  width: 0.4rem;
  float: left;
}
.portrait img {
  width: 100%;
  height:.4rem;
  border-radius:50%;
  border: none;
  display: inline-block;
  margin-top: 0.02rem;
}
.name-theme-c {
  margin-left: 0.44rem;
}
.name-theme-c p {
  padding: 0;
  margin: 0;
  text-align: left;
}
.name-theme-c p.name {
  font-size: 0.12rem;
  color: #999;
  margin-top:.08rem;
}
.name-theme-c p.theme {
  font-size: 0.14rem;
  line-height: 0.18rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.04rem;
}
</style>