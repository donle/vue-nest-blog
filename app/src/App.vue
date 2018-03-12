<template>
  <div id="app">
    <h1 class="display-3">Jen Liu</h1>
    <v-toolbar class="red accent-2 nav-bar hidden-xs-only">
      <v-layout class="nav-items" row>
        <v-flex xs2><v-btn flat to="/">首页</v-btn></v-flex>
        <v-flex xs2><v-btn flat to="/">文章</v-btn></v-flex>
        <v-flex xs2><v-btn flat to="/">游记</v-btn></v-flex>
        <v-flex xs2><v-btn flat to="/">摄影</v-btn></v-flex>
        <v-flex xs2><v-btn flat to="/">音乐</v-btn></v-flex>
        <v-flex xs2><v-btn flat to="/">关于我</v-btn></v-flex>
      </v-layout>
    </v-toolbar>
    <v-toolbar class="red accent-2 hidden-sm-and-up mobile-nav-bar">
      <v-toolbar-side-icon icon></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ div.toolbar__content {
    width: 100%;
  }
  .nav-items {
    width: 100%;
    max-width: 860px;
    height: 100%;
    margin: auto;
  }
  button,
  a {
    color: white;
    margin: 0;
    height: 100%;
    width: 100%;
  }
}
.mobile-nav-bar {
  color: white;
}
</style>

<style>
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: "liga";
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
html {
  overflow: initial;
}
body {
  font-family: "Microsoft YaHei" !important;
}
</style>
