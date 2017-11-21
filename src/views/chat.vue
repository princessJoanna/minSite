<template>
  <div>
     <left-nav></left-nav>
    <head-nav></head-nav>
      <div class="imgClick" id="online-service" @click="link">
        <img src="https://qiyukf.com/sdk/res/kefu/custom/4.png" alt="">
      </div>
  </div>
</template>
<script>
import Vue from "vue";
import headNav from "@/components/headNav";
import leftNav from "../components/leftNav"; //引用左侧菜单栏

export default {
  data() {
    return {};
  },
  components: {
    headNav,
    leftNav
  },
  beforeCreated() {},
  created() {
    this.$store.commit("setNav", {
      isShow: false, //左侧菜单栏默认为关闭状态
      current: "chat" //设置左菜单栏高亮
    });
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src ='https://qiyukf.com/script/'+process.env.qiyukf;
    document.body.appendChild(s);
  },
  mounted() {
    var chatDom = document.getElementById("online-service");
    if (chatDom) {
      setTimeout(function() {
        document.getElementById("online-service").click();
      }, 200);
    }
  },
  updated() {},
  methods: {
    link() {
      // location.href = ysf.url();
      window.location.replace(ysf.url());
    }
  }
};
</script>
<style>
.imgClick {
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* top:50%; */
  /* left:50%; */
  /* 　transform: translate(-50%, -50%); */
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  background: #f96868;
}
.mesbox {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.area {
  width: 90%;
  margin: 0 auto;
  height: 0.5rem;
  border: #eee 1px solid;
  display: block;
  line-height: 0.3rem;
  border-radius: 0.02rem;
  outline-color: #fff;
}
.send {
  background: green;
  color: #fff;
  line-height: 0.3rem;
  border-radius: 0.02rem;
  margin: 0.2rem auto;
  width: 90%;
  text-align: center;
}
</style>

