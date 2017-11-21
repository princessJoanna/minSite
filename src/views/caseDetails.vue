<template>
  <div>
      <white-nav></white-nav>
      <div v-html="caseDetails" class="page_caseDetails">
      </div>
      <appointment :desiner="desienrMes"></appointment> 
  </div>
</template>
<style scoped>
.page_caseDetails {
  padding-top:.5rem;
  padding-bottom:.62rem;
  overflow: scroll;
}
.page_caseDetails img {
  max-width:100%  !important;
  height:auto !important;
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
      caseDetails: "",
      desienrMes:{},
      authorId:''
  
    };
  },
  mounted(){
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
  methods: {
    getData(){
      var _self=this;
          return new Promise((resolve, reject) => {
            _self.$http.get('/minisite/getDesignerCaseDetail', {params:{case_id:_self.$route.params.case_id}})
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
              _self.desienrMes={
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




