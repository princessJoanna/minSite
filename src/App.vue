<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view> 
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
  
  },

  methods: {

  }
};
</script>

<style>
html {
  font-size: 100px;
  height: 100%;
  font-family: "Helvetica Neue',Helvetica,Arial,sans-serif"
}
body {
  font-size: 12px;
  height: 100%;
}
.container {
  height: 100%;
}
.more {
  color: #999;
  font-size: 0.11rem;
  line-height: 14px;
  margin-bottom: 0.09rem;
}
#app{
     height:100%;
}
</style>
