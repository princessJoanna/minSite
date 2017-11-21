<template>
<div class="page-desinerList">
	<left-nav></left-nav>
	<head-nav></head-nav>
	<ul class="desinerList">
		<li class="singDesiner" v-for="(single, index) in dataJson" >
			<div class="topDesc">
        <router-link :to="'desinerDetails/'+single.designer_uid">
				<img :src="single.head_image_url" class="headImg">
        </router-link>
				<div class="rightText">
          <router-link :to="'desinerDetails/'+single.designer_uid">
					<p class="textUnder">
            <span class="desinerName">{{single.designer_name}}</span>&nbsp;
            <span class="desinerRank"></span></p><!--{{single.designer_level}}设计师级别-->
					</router-link>
          <router-link :to="'desinerDetails/'+single.designer_uid">
          <p class="plantform_descript"><span class="city">{{single.city}}</span>&nbsp;|&nbsp;<span>{{single.plantform_descript}}</span></p>
					</router-link>
          <router-link :to="'desinerDetails/'+single.designer_uid">
          <p class="price"><span>{{single.designer_price}}-{{single.designer_high_price}}</span>&nbsp;<span>元/平方</span></p>
          </router-link>
        </div>
			</div>
			<div class="imgList">
        <div class="imgSingle"  v-for="(list,item) in single.designer_case_list"  @click="linkTo(single,item)" v-if="item<3">
          <img :src="list.wide_screen_image"  v-if="list.wide_screen_image" class="imgH">
            <img v-else src="http://img01.tooopen.com/Downs/images/2010/4/8/sy_20100408112256193519.jpg" class="imgH">
        </div>
		
			</div>
		</li>
	</ul>
  <h4 v-if="!moreData" class="info">没有更多了...</h4>
 </div>
</template>
<script>
import headNav from "@/components/headNav";
import leftNav from "../components/leftNav";
import { getDesinerMes } from '@/api/desinerList';
export default {
  components: {
    headNav,
    leftNav
  },
  data() {
    return {
      page_no: 1,
      page_count: 1,
      moreData: true,
      dataJson: null,
      page_size: 6
    };
  },
  created() {
    this.$store.commit("setNav", {
      isShow: false, //左侧菜单栏默认为关闭状态
      current: "desinerList" //设置左菜单栏高亮
    });
    var _self = this;
    this.getList({ page_size: _self.page_size, page_no: 1 })
      .then(json => {
        _self.dataJson = json.data.data.result;
        _self.page_count = json.data.data.total;
      })
      .catch(err => {});
    //加载更多
    document.body.addEventListener("touchend", function(e) {
      var clientHeight =
        document.documentElement.scrollTop === 0
          ? document.body.clientHeight
          : document.documentElement.clientHeight;
      var scrollTop =
        document.documentElement.scrollTop === 0
          ? document.body.scrollTop
          : document.documentElement.scrollTop;
      var scrollHeight =
        document.documentElement.scrollTop === 0
          ? document.body.scrollHeight
          : document.documentElement.scrollHeight;

      if (scrollTop >= scrollHeight - clientHeight && _self.moreData) {
        _self.page_no++;
        _self.getMoreData();
      }
    });
  },
  mounted(){
    this.$nextTick(function(){
       this.shareWx.getId();
      this.shareWx.shareReady("找设计师 | 设计IN-设计师严选平台");

    })
  
  },
  methods: {
    getMoreData() {
      //接口数据
      var _self = this;
      this.getList({  page_no: _self.page_no, page_size: _self.page_size})
        .then(json => {
          var data = json.data.data.result;
          if (data.length < _self.page_size) {
            _self.moreData = false;
          }
          for (var i = 0; i < data.length; i++) {
            _self.dataJson.push(data[i]);
          }
        })
        .catch(err => {});
    },
    linkTo(sing,item) {
      this.$store.commit("setAppointment", {
       head_image_url:sing.head_image_url,
       designer_name:sing.designer_name,
       desiner_id:sing.designer_case_list[item].designer_case_uid,
       title:sing.designer_case_list[item].title
       
      });
      this.$router.push({path:'./caseDetails/'+sing.designer_case_list[item].designer_case_uid,});
    },
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

<style scoped>
.page-desinerList {
  padding-top: 0.52rem;
}
ul,
li,
p {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
p {
  line-height: 0.2rem;
}
.desinerList {
  margin:0 .1rem;

}
.desinerList .singDesiner {
  padding: 0.12rem 0;
  border-bottom: 1px solid #ccc;
}
.desinerList .topDesc {
  margin-bottom: 0.1rem;
  overflow: hidden;
}
.desinerList .headImg {
  float: left;
  border-radius: 50%;
  width: 0.55rem;
  height: 0.55rem;
}
.desinerList .rightText {
  margin-left: 0.1rem;
  margin-left: 0.66rem;
  text-decoration: none;
}
 .rightText  p {
   line-height: .16rem;
 }
.desinerList .textUnder {
  text-decoration-style: none;
}
.desinerList .plantform_descript {
  margin-top:.02rem;
  color: #9e9e9e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desinerList .price {
  color: #9e9e9e;
}
.desinerList .desinerName {
  font-size: 14px;
  color: black;
  text-decoration: none;
  /* font-weight: bold; */
}
.desinerList .desinerRank {
  color: #93d36a;
}
.desinerList .imgList {
  /* height: 1rem; */
  display: flex; /*设置为flex布局*/
  /* justify-content: space-around;
   */
  justify-content: space-between;
}
.desinerList .imgSingle {
  width: 1.06rem;

}
.imgH {
  width: 100%;
  height: .66rem;
}
.info {
  text-align: center;
  color:#666;
}
</style>

