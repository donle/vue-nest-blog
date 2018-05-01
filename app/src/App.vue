<template>
  <v-app id="app">
    <Header v-if="!this.hideHeader" />
    <v-content :class="{ 'pb-3': !this.hideHeader }">
      <Banner v-if="!this.hideHeader" :display="!hideHeader" />
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
      hideHeader: false
    }
  },
  computed: {
    isAdmin: function () {
      return this.hideHeader ? 'admin' : '';
    }
  },
  watch: {
    '$route' (to) {
      if (this.$route.path.indexOf('admin') >= 0) this.hideHeader = true;
      else this.hideHeader = false;
      this.$root.$emit('routerChanged', to.path);
    }
  },
  created () {
    if (this.$route.path.indexOf('admin') >= 0) this.hideHeader = true;
    else this.hideHeader = false;
    this.$root.$emit('routerChanged', this.$route.path);
  },
  mounted () {
    if (this.$route.path.indexOf('admin') >= 0) this.hideHeader = true;
    else this.hideHeader = false;
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
  max-width: 960px;
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
