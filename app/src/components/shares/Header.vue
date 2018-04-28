<template>
  <div id="header">
    <h1 class="display-3">Jen Liu</h1>
    <v-toolbar class="red accent-2 nav-bar hidden-xs-only">
      <v-layout class="nav-items" row>
      <v-flex xs2><v-btn flat to="/home">首页</v-btn></v-flex>
      <v-flex xs2><v-btn flat :to="{ path: '/blog' }">文章</v-btn></v-flex>
      <v-flex xs2><v-btn flat :to="{ path: '/travel' }">游记</v-btn></v-flex>
      <v-flex xs2><v-btn flat to="/">摄影</v-btn></v-flex>
      <v-flex xs2><v-btn flat to="/">音乐</v-btn></v-flex>
      <v-flex xs2><v-btn flat to="/">关于我</v-btn></v-flex>
      </v-layout>
    </v-toolbar>
    <v-toolbar class="red accent-2 hidden-sm-and-up mobile-nav-bar">
      <v-toolbar-side-icon icon @click.native="openMobileMenu()"></v-toolbar-side-icon>
      <v-layout class="mobile-nav red accent-2 row wrap elevation-1" :class="{ 'expand': menuEnabled }">
      <v-flex xs12 class="pl-3 pr-3"><v-btn flat @click.native="openMobileMenu()" to="/home" class="ma-0 link">首页</v-btn></v-flex>
      <v-flex xs12 class="pl-3 pr-3"><v-btn flat @click.native="openMobileMenu()" :to="{ path: '/blog' }" class="ma-0 link">文章</v-btn></v-flex>
      <v-flex xs12 class="pl-3 pr-3"><v-btn flat @click.native="openMobileMenu()" :to="{ path: '/travel' }" class="ma-0 link">游记</v-btn></v-flex>
      <v-flex xs12 class="pl-3 pr-3"><v-btn flat @click.native="openMobileMenu()" to="/" class="ma-0 link">摄影</v-btn></v-flex>
      <v-flex xs12 class="pl-3 pr-3"><v-btn flat @click.native="openMobileMenu()" to="/" class="ma-0 link">音乐</v-btn></v-flex>
      <v-flex xs12 class="pl-3 pr-3"><v-btn flat @click.native="openMobileMenu()" to="/" class="ma-0 link">关于我</v-btn></v-flex>
      </v-layout>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  created () {
  },
  data () {
    return {
      menuEnabled: false
    }
  },
  methods: {
    openMobileMenu: function () {
      this.menuEnabled = !this.menuEnabled;
    }
  } 
};
</script>

<style lang="scss" scoped>

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ div.toolbar__content {
    width: 100%;
  }
  .nav-items {
    width: 100%;
    max-width: 960px;
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
  position: relative;
  z-index: 999;
}
.mobile-nav {
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  .link {
    color: white;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  &.expand {
    max-height: 288px;
  }
}
</style>