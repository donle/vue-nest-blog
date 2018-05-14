<template>
  <v-app id="app">
    <Header v-if="!this.hideHeader" />
    <v-content :class="{ 'pb-3': !this.hideHeader }">
      <Banner v-if="!(this.hideBanner || this.hideHeader)" :display="!hideHeader" />
      <v-container fluid :class="[isAdmin, 'pa-0', 'main' ]">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Banner from '@/components/shares/Banner';
import Header from '@/components/shares/Header';

export default {
  name: "app",
  components: { Banner, Header },
  data () {
    return {
      hideHeader: false,
      hideBanner: false
    }
  },
  computed: {
    isAdmin: function () {
      return this.hideHeader ? 'admin' : '';
    }
  },
  watch: {
    '$route' () {
      if (this.$route.path.indexOf('admin') >= 0) this.hideHeader = true;
      else this.hideHeader = false;
      if (this.$route.path.indexOf('article') >= 0) this.hideBanner = true;
      else this.hideBanner = false;
    }
  },
  created () {
    if (this.$route.path.indexOf('admin') >= 0) this.hideHeader = true;
    else this.hideHeader = false;
    if (this.$route.path.indexOf('article') >= 0) this.hideBanner = true;
    else this.hideBanner = false;
  }
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

.main {
  max-width: 960px !important;
  width: 100%;
  margin: auto;
  &.admin {
    max-width: initial;
  }
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
  background: #eee;
}
</style>
