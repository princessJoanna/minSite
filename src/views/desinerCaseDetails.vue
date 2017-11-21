<template>
<div class="desinerCaseDetails">
  <white-nav></white-nav>
<div v-html="caseDetails" class="caseDetails" @touchstart="touchstart($event)" @touchend="touchend($event)">
    </div>
    <appointment :desiner="desinerMes"></appointment> 
</div>
    
</template>
<style>
.desinerCaseDetails img {
  max-width:100% !important;
  height:auto !important;
}
.caseDetails{
  padding-top:.5rem;
  padding-bottom:.62rem;
}
</style>

<script>
var vm = {};
import appointment from "../components/appointment";
import whiteNav from "../components/detailNav/whiteNav";
export default {
    components: { appointment, whiteNav },
  data() {
    return {
      case_title:'',
      image:'',
      startY: 0,
      caseDetails: "",
      caseSlideIndex: 0,
      desinerMes:{},
      authorId:''
    };
  },
  beforeCreate(){

  },
  created() {
    vm = this;
    this.authorId=this.getCookie("wechat_id");
    if(!this.authorId){
      
            window.location.href = "/minisite/login?originUrl="+encodeURIComponent(window.location.host+'/#'+this.$route.fullPath);
         return
    }  
     this.getData();
  
  },
  mounted(){
  },
  methods: {
    getData() { 
          var _self=this;
          return new Promise((resolve, reject) => {
            _self.$http.get('/minisite/getDesignerCaseDetail', {params:{case_id:_self.$route.query.caseId}})
            .then(response=>{
              if(response.data.code!=200){
                return
              } 
              document.title=response.data.data.title;
              _self.case_title = response.data.data.title;
              _self.image = response.data.data.image;
              _self.caseDetails=response.data.data.caseDetail;
              this.$nextTick(function(){
               this.shareWx.getId();
                this.shareWx.shareReady(_self.case_title+"| 设计IN-设计师严选平台",'',_self.image+'?imageView2/5/w/50');
              });
              _self.desinerMes={
                designer_uid:response.data.data.designerId,
                head_image_url:response.data.data.image,
                designer_name:response.data.data.name,
                authorId:_self.authorId
               
              }
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
    },
    touchstart(event) {
      this.startY = event.changedTouches[0].pageY;
    },
    touchend(event) {
      var endY = event.changedTouches[0].pageY;
      var offsetTop = event.target.offsetTop;
      if (this.startY - endY < -30 && offsetTop < document.body.clientWidth) {
        var url = "./#/desinerDetails/" +this.$route.params.desiner_id +"?caseSlideIndex=" + this.$route.query.caseSlideIndex +"&startIndex=1";
        window.location.href = url;
      }
    },
     getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
      }
  }
};
</script>
<style scoped>
.page_caseDetails img {
  max-width: 100% !important;
  height:auto !important;
}
</style>




