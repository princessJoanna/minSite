<template>

  <div class="lefBar" id="leftBar" v-bind:class="{ 'show': $store.state.leftBar.nav.isShow }">
      <div class="shadow" @click="hideLeftBar"></div>
      <div class="nav">
          <ul>
              <li v-for="item in menu" v-bind:class="{ 'active': $store.state.leftBar.nav.current==item.link }" @click="goLink(item.link)">
                      <i><img :src="'static/images/'+item.icon+'.png'"></i>
                      <span>{{item.name}}</span>
              </li>
          </ul>
          
      </div>
  </div>
</template>
<style >
.lefBar {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 22;
  display: none;
}
.show {
  display: block;
  animation: animateLeft 0.5s;
}
@keyframes animateLeft {
  from {
    opacity: 0;
    left: -50%;
  }
  to {
    opacity: 1;
    left: 0;
  }
}
.shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 2;
  background-color: #000;
}
.lefBar ul {
  margin: 0;
  padding: 0.16rem 0 0 0;
}
.lefBar ul,
.lefBar li {
  list-style: none;
}
.lefBar li.active {
  background: #eeeeee;
}
.lefBar .nav {
  position: relative;
  z-index: 55;
  width: 66.718%;
  position: relative;
  background: #fafafa;
  height: 100%;
}
.lefBar ul li i {
  width: 0.16rem;
  display: inline-block;

  margin-left: 0.14rem;
}
.lefBar ul li:nth-child(1) {
  margin-top: 0;
}
.lefBar li:last-child {
  padding-top: 0.05rem;
  border-top: #eee 1px solid;
}
.lefBar li {
  line-height: 0.33rem;
  margin: 0.14rem 0;
}
.lefBar ul li i img {
  width: 100%;
  vertical-align: middle;
}
.lefBar ul li span {
  margin-left: 0.1rem;
  display: inline-block;
  vertical-align: middle;
}
.lefBar li a {
  color: #666;
  text-decoration: none;
}
</style>

<script>
import store from "@/store";
export default {
  data() {
    return {
      menu: [
        { link: "index", icon: "home", name: "首页" },
        { link: "caseList", icon: "trash", name: "查看案例" },
        { link: "desinerList", icon: "person", name: "找设计师" },
        { link: "chat", icon: "call", name: "在线咨询" },
        { link: "aboutUs", icon: "warn", name: "关于" }
      ]
    };
  },
  methods: {
    hideLeftBar() {
      this.$store.commit("setNav", {
        isShow: false,
        current: this.$store.getters.nav.current
      });
    

    },
    goLink(link) {
      this.$router.push({
        path: "/" + link
      });
      this.hideLeftBar();
    }
  }
};
</script>
