<template>
  <div class="page-caseList">
    <left-nav></left-nav>
    <head-nav></head-nav>
    <ul class="caseListContainer">
      <li class="singleCase" v-for="(single, index) in dataJson">
        <div @click="linkTo(single)">
          <img :src="single.widescreen_image" class="headPic">
        </div>
        <div class="detail">
          <div @click="linkTo(single)">
            <p class="title">{{single.title}}</p>
          </div>
          <div  @click="linkTo(single)">
            <p class="houseType">{{single.house_type}}</p>
          </div>
          <div class="desiner">
            <router-link :to="'desinerDetails/'+single.designer_uid">
            <img class="headImg" :src="single.head_image_url" alt="">
            </router-link>
            <div class="nameLev">
              <div :to="'desinerDetails/'+single.designer_uid">
                <p class="desinerName">{{single.designer_name}}</p>
              </div>
              <!--{{single.designer_level}}设计师级别-->
              <!-- <div :to="'desinerDetails/'+single.designer_uid">
                <p class="desinerRank">{{single.designer_level}}</p>
              </div> -->
            </div>   
          </div>
        </div>
      </li>
    </ul>
    <h4 v-if="!moreData" class="info">没有更多了...</h4>
  </div>
</template>
<script>
import headNav from "@/components/headNav";
import leftNav from "../components/leftNav"; //引用左侧菜单栏
import { getCaseMes } from '@/api/caseList';
// import store from "@/store";
export default {
  components: {
    headNav,
    leftNav
  },
  data() {
    return {
      page_no: 1,
      page_size: 6,
      page_count: 1,
      moreData: true,
      dataJson: null
    };
  },
  created() {
  

    var _self = this;
    this.$store.commit("setNav", {
      isShow: false, //左侧菜单栏默认为关闭状态
      current: "caseList" //设置左菜单栏高亮
    });
    // this.$store
    //   .dispatch("GetCaseMes", { page_size: 6, page_no: 1 })
    this.getList({ page_size: 6, page_no: 1 })
      .then(json => {
        _self.page_count = json.data.data.page_count;
        _self.dataJson = json.data.data.list;
        // localStorage.setItem( "GetCaseList", JSON.stringify(json.data.data.list));
      })
      .catch(err => {});
    /**@augments
     * document.body.clientHeight  网页可见区域高
     * document.body.scrollHeight  文档高度 
     */
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
        this.shareWx.shareReady("看设计案例 | 设计IN-设计师严选平台");

    })
   
  },
  updated() {},
  
  methods: {
    getMoreData() {
      //接口数据
      var _self = this;
       this.getList({   page_no: _self.page_no,  page_size: _self.page_size })
        .then(json => {
          var data = json.data.data.list;
          if (data.length < _self.page_size) {
            _self.moreData = false;
          }
          for (var i = 0; i < data.length; i++) {
            _self.dataJson.push(data[i]);
          }
        })
        .catch(err => {});
    },
    linkTo(single) {
       this.$store.commit("setAppointment", {
       head_image_url:single.head_image_url,
       designer_name:single.designer_name,
       desiner_id:single.designer_uid,
       title:single.title

      });
      this.$router.push({path:'./caseDetails/'+single.id});
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
<style scoped>
.page-caseList {
  padding-top: 0.52rem;
}
ul,
li,
p {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.caseListContainer {
  margin: 0  .15rem;

}
.singleCase {
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.caseListContainer .leftPic {
  /* margin:.1rem 0; */
  width: 1.61rem;
  height: 1.15rem;
  float: left;
}
.caseListContainer li {
  overflow: hidden;
  padding: 0.14rem 0;
}
.headPic {
  border-radius:.02rem;
  width: 1.62Rem;
  height: 1.15rem;
  float: left;
}
.caseListContainer .detail {
  margin-left: 1.75rem;
}
.caseListContainer .detail .title {
  font-size: 16px;
  margin-bottom: 0.06rem;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.houseType {
  color: #9e9e9e;
  font-size:14px;
  margin-top:.1rem;
}
.caseListContainer .desiner {
  margin-top: 0.27rem;
  overflow: hidden;
}
.headImg {
  float: left;
  border-radius: 50%;
  width: 0.45rem;
  height: 0.45rem;
}
.nameLev {
  margin-left: 0.1rem;
  float: left;
}
.desinerName {
  line-height: 0.2rem;
  color: black;
  margin-top:.1rem;
}
.desinerRank {
  color: #93d36a;
  line-height: 0.2rem;
}
.info {
  text-align: center;
  color:#666;
}
</style>

